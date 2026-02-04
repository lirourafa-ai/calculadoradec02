/**
 * Inicialização e Gerenciamento de Eventos da Aplicação
 * Integra todas as funcionalidades em uma aplicação coesa
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculator-form');
  const manualCheckbox = document.getElementById('manual-distance');
  const distanceInput = document.getElementById('distance');

  /**
   * Valida os dados do formulário
   * @returns {Object|null} Dados validados ou null
   */
  function validateForm() {
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const transport = document.querySelector('input[name="transport"]:checked')?.value;
    const distance = parseFloat(distanceInput.value);

    // Validações
    if (!origin) {
      throw new Error('Por favor, selecione a cidade de origem');
    }

    if (!destination) {
      throw new Error('Por favor, selecione a cidade de destino');
    }

    if (origin.toLowerCase() === destination.toLowerCase()) {
      throw new Error('As cidades de origem e destino devem ser diferentes');
    }

    if (!transport) {
      throw new Error('Por favor, selecione um modo de transporte');
    }

    if (!distance || distance <= 0) {
      throw new Error('Por favor, insira uma distância válida (maior que 0 km)');
    }

    if (!manualCheckbox.checked && !RoutesDB.findDistance(origin, destination)) {
      throw new Error('Rota não encontrada. Por favor, ative "Inserir distância manualmente"');
    }

    return { origin, destination, transport, distance };
  }

  /**
   * Handler do submit do formulário
   */
  function handleSubmit(e) {
    e.preventDefault();

    try {
      // Limpa mensagens anteriores
      UI.clearResults();

      // Valida formulário
      const data = validateForm();

      // Mostra carregamento
      UI.showLoading();

      // Simula processamento (1500ms)
      setTimeout(() => {
        try {
          // Realiza cálculos
          const result = Calculator.calculate(data);

          // Oculta carregamento
          UI.hideLoading();

          // Renderiza resultados em sequência com pequeno delay
          setTimeout(() => {
            UI.renderResults(result);
            UI.scrollToElement('#results');
          }, 200);

          setTimeout(() => {
            UI.renderComparison(result);
          }, 400);

          setTimeout(() => {
            UI.renderCarbonCredits(result);
          }, 600);

        } catch (error) {
          UI.hideLoading();
          UI.showError('Erro ao calcular: ' + error.message);
          console.error('Erro no cálculo:', error);
        }
      }, 1500);

    } catch (error) {
      UI.showError(error.message);
      console.error('Erro na validação:', error);
    }
  }

  /**
   * Handler do checkbox de distância manual
   */
  function handleManualDistanceToggle() {
    if (manualCheckbox.checked) {
      distanceInput.readOnly = false;
      distanceInput.placeholder = 'Digite a distância em km';
      distanceInput.value = '';
      distanceInput.focus();
    } else {
      distanceInput.readOnly = true;
      const origin = document.getElementById('origin').value;
      const destination = document.getElementById('destination').value;
      const distance = RoutesDB.findDistance(origin, destination);
      
      if (distance) {
        distanceInput.value = distance;
        distanceInput.placeholder = 'Distância preenchida automaticamente';
      } else {
        distanceInput.value = '';
        distanceInput.placeholder = 'Rota não encontrada - ative manual';
      }
    }
  }

  /**
   * Handler para atualizar distância ao mudar cidades
   */
  function handleCityChange() {
    if (!manualCheckbox.checked) {
      const origin = document.getElementById('origin').value;
      const destination = document.getElementById('destination').value;
      const distance = RoutesDB.findDistance(origin, destination);
      
      if (distance) {
        distanceInput.value = distance;
        distanceInput.placeholder = 'Distância preenchida automaticamente';
      } else {
        distanceInput.value = '';
        distanceInput.placeholder = 'Rota não encontrada - ative manual';
      }
    }
  }

  /**
   * Configura listeners de entrada para validação em tempo real
   */
  function setupRealtimeValidation() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');

    originInput.addEventListener('change', handleCityChange);
    destinationInput.addEventListener('change', handleCityChange);

    // Valida ao tentar submeter
    form.addEventListener('submit', handleSubmit);
    manualCheckbox.addEventListener('change', handleManualDistanceToggle);

    // Permite submeter com Enter quando distância está preenchida
    distanceInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
      }
    });
  }

  /**
   * Inicializa a aplicação
   */
  function init() {
    setupRealtimeValidation();
    console.log('Aplicação inicializada com sucesso!');
  }

  // Inicia a aplicação
  init();
});
