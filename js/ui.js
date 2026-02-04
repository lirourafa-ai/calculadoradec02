/**
 * Gerenciador de Interface do Usuário
 * Responsável por renderizar resultados e gerenciar estado visual
 */

const UI = {
  /**
   * Formata número com locale pt-BR
   * @param {number} num - Número a formatar
   * @param {number} decimals - Casas decimais (padrão: 2)
   * @returns {string} Número formatado
   */
  formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  },

  /**
   * Formata valor como moeda brasileira (R$)
   * @param {number} value - Valor em reais
   * @returns {string} Valor formatado como R$
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  /**
   * Mostra elemento removendo classe hidden
   * @param {string|HTMLElement} selector - Seletor CSS ou elemento
   */
  showElement(selector) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (element) {
      element.classList.remove('hidden');
    }
  },

  /**
   * Oculta elemento adicionando classe hidden
   * @param {string|HTMLElement} selector - Seletor CSS ou elemento
   */
  hideElement(selector) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (element) {
      element.classList.add('hidden');
    }
  },

  /**
   * Faz scroll suave para elemento
   * @param {string|HTMLElement} selector - Seletor CSS ou elemento
   */
  scrollToElement(selector) {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Mostra indicador de carregamento
   */
  showLoading() {
    this.showElement('#loading');
  },

  /**
   * Oculta indicador de carregamento
   */
  hideLoading() {
    this.hideElement('#loading');
  },

  /**
   * Mostra mensagem de erro
   * @param {string} message - Mensagem de erro
   */
  showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = message;
      this.showElement(errorElement);
    }
  },

  /**
   * Oculta mensagem de erro
   */
  hideError() {
    this.hideElement('#error-message');
  },

  /**
   * Renderiza seção de resultados principais
   * @param {Object} result - Objeto de resultado do calculador
   */
  renderResults(result) {
    const container = document.getElementById('results-content');
    if (!container) return;

    const { route, selectedEmission, transport, allEmissions } = result;
    const mode = CONFIG.TRANSPORT_MODES[transport];

    const html = `
      <div class="result-card">
        <h3>Rota</h3>
        <p style="font-size: 1rem; color: #374151; margin-bottom: 0.5rem;">
          ${route.origin} → ${route.destination}
        </p>
        <p style="color: #6b7280; font-size: 0.875rem;">
          ${this.formatNumber(route.distance, 0)} km
        </p>
      </div>

      <div class="result-card">
        <h3>Modo Selecionado</h3>
        <div style="font-size: 1.25rem; margin-bottom: 0.5rem;">
          ${mode.icon} ${mode.label}
        </div>
        <p style="color: #6b7280; font-size: 0.875rem;">
          ${mode.description}
        </p>
      </div>

      <div class="result-card" style="border-left-color: #ef4444;">
        <h3>Emissão de CO₂</h3>
        <div class="value">
          ${this.formatNumber(selectedEmission, 2)}
          <span class="unit">kg</span>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem; margin-top: 0.5rem;">
          ou ${this.formatNumber(selectedEmission / 1000, 3)} toneladas
        </p>
      </div>
    `;

    container.innerHTML = html;
    this.showElement('#results');
  },

  /**
   * Renderiza seção de comparação entre modos
   * @param {Object} result - Objeto de resultado do calculador
   */
  renderComparison(result) {
    const container = document.getElementById('comparison-content');
    if (!container) return;

    const { allEmissions, savings, transport } = result;
    const modes = Object.keys(CONFIG.EMISSION_FACTORS);
    
    // Encontra emissão máxima para escala
    const maxEmission = Math.max(...Object.values(allEmissions));
    
    let html = '';
    modes.forEach(mode => {
      const emission = allEmissions[mode];
      const percentage = maxEmission > 0 ? (emission / maxEmission) * 100 : 0;
      const isSelected = mode === transport;
      const modeConfig = CONFIG.TRANSPORT_MODES[mode];
      
      html += `
        <div class="comparison-item" ${isSelected ? 'style="border: 2px solid #10b981;"' : ''}>
          <div class="comparison-header">
            <div class="comparison-label">
              <span class="comparison-icon">${modeConfig.icon}</span>
              <span>${modeConfig.label}</span>
            </div>
            <div class="comparison-value">
              ${this.formatNumber(emission, 2)} kg
            </div>
          </div>
          <div class="comparison-bar">
            <div class="comparison-bar-fill" style="width: ${percentage}%">
              ${percentage > 10 ? Math.round(percentage) + '%' : ''}
            </div>
          </div>
          ${isSelected ? '<p style="margin-top: 0.5rem; color: #10b981; font-weight: 600;">✓ Selecionado</p>' : ''}
        </div>
      `;
    });

    container.innerHTML = html;
    this.showElement('#comparison');
  },

  /**
   * Renderiza seção de créditos de carbono
   * @param {Object} result - Objeto de resultado do calculador
   */
  renderCarbonCredits(result) {
    const container = document.getElementById('carbon-credits-content');
    if (!container) return;

    const { credits, creditPrice, selectedEmission } = result;
    const equivalents = this.calculateEquivalents(selectedEmission);

    const html = `
      <div class="credit-card">
        <h3>Créditos Necessários</h3>
        <div class="value">
          ${this.formatNumber(credits, 4)}
          <span class="unit">créditos</span>
        </div>
        <p style="margin-top: 0.75rem;">
          Para compensar a emissão de CO₂ desta viagem
        </p>
      </div>

      <div class="credit-card" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
        <h3>Custo de Neutralização</h3>
        <div class="value">
          ${this.formatCurrency(creditPrice)}
        </div>
        <p style="margin-top: 0.75rem;">
          Preço estimado para compensar via créditos de carbono
        </p>
      </div>

      <div class="credit-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
        <h3>Equivalente em Árvores</h3>
        <div class="value">
          ${equivalents.trees}
          <span class="unit">árvores/ano</span>
        </div>
        <p style="margin-top: 0.75rem;">
          Árvores necessárias para absorver este CO₂ em 1 ano
        </p>
      </div>
    `;

    container.innerHTML = html;
    this.showElement('#carbon-credits');
  },

  /**
   * Calcula equivalentes ambientais
   * @param {number} emissionKg - Emissão em kg de CO₂
   * @returns {Object} Equivalentes calculados
   */
  calculateEquivalents(emissionKg) {
    // Uma árvore absorve aproximadamente 20 kg de CO₂ por ano
    const kgPerTreePerYear = 20;
    
    return {
      trees: Math.ceil(emissionKg / kgPerTreePerYear)
    };
  },

  /**
   * Limpa todos os resultados
   */
  clearResults() {
    this.hideElement('#results');
    this.hideElement('#comparison');
    this.hideElement('#carbon-credits');
    this.hideError();
  }
};
