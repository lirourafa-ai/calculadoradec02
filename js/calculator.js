/**
 * Motor de Cálculo de Emissão de Carbono
 * Realiza cálculos de emissão, economia e créditos de carbono
 */

const Calculator = {
  /**
   * Calcula a emissão de CO₂ para um modo de transporte e distância
   * @param {string} transportMode - Modo de transporte
   * @param {number} distance - Distância em km
   * @returns {number} Emissão em kg CO₂
   */
  calculateEmission(transportMode, distance) {
    if (!transportMode || !distance || distance <= 0) return 0;
    
    const factor = CONFIG.EMISSION_FACTORS[transportMode];
    if (factor === undefined) return 0;
    
    return distance * factor;
  },

  /**
   * Calcula emissão para todos os modos de transporte
   * @param {number} distance - Distância em km
   * @returns {Object} Emissões por modo
   */
  calculateAllModes(distance) {
    const emissions = {};
    
    Object.keys(CONFIG.EMISSION_FACTORS).forEach(mode => {
      emissions[mode] = this.calculateEmission(mode, distance);
    });
    
    return emissions;
  },

  /**
   * Calcula economia em relação ao carro (baseline)
   * @param {number} emissionCarro - Emissão do carro em kg CO₂
   * @param {number} emissionMode - Emissão do modo escolhido em kg CO₂
   * @returns {number} Percentual de economia (-100 a 100)
   */
  calculateSavings(emissionCarro, emissionMode) {
    if (emissionCarro === 0) return 0;
    
    const savings = ((emissionCarro - emissionMode) / emissionCarro) * 100;
    return Math.round(savings);
  },

  /**
   * Converte kg de CO₂ para créditos de carbono
   * @param {number} emissionKg - Emissão em kg
   * @returns {number} Número de créditos
   */
  calculateCarbonCredits(emissionKg) {
    if (emissionKg <= 0) return 0;
    return emissionKg / CONFIG.CARBON_CREDIT.conversion;
  },

  /**
   * Estima o preço em R$ para neutralizar a emissão
   * @param {number} credits - Número de créditos
   * @returns {number} Preço em R$
   */
  estimateCreditPrice(credits) {
    return credits * CONFIG.CARBON_CREDIT.price;
  },

  /**
   * Realiza cálculo completo para uma rota
   * @param {Object} data - Dados do formulário
   * @param {string} data.origin - Cidade de origem
   * @param {string} data.destination - Cidade de destino
   * @param {string} data.transport - Modo de transporte
   * @param {number} data.distance - Distância em km
   * @returns {Object} Resultado completo do cálculo
   */
  calculate(data) {
    const { origin, destination, transport, distance } = data;

    // Validação básica
    if (!origin || !destination || !transport || !distance || distance <= 0) {
      throw new Error('Dados inválidos fornecidos para cálculo');
    }

    // Cálculos principais
    const selectedEmission = this.calculateEmission(transport, distance);
    const allEmissions = this.calculateAllModes(distance);
    const carEmission = allEmissions.carro;
    const savings = this.calculateSavings(carEmission, selectedEmission);
    const credits = this.calculateCarbonCredits(selectedEmission);
    const creditPrice = this.estimateCreditPrice(credits);

    return {
      route: {
        origin,
        destination,
        distance: parseFloat(distance)
      },
      transport,
      selectedEmission: Math.round(selectedEmission * 100) / 100,
      allEmissions: {
        bicicleta: Math.round(allEmissions.bicicleta * 100) / 100,
        carro: Math.round(allEmissions.carro * 100) / 100,
        onibus: Math.round(allEmissions.onibus * 100) / 100,
        caminhao: Math.round(allEmissions.caminhao * 100) / 100
      },
      savings,
      credits: Math.round(credits * 10000) / 10000,
      creditPrice: Math.round(creditPrice * 100) / 100,
      timestamp: new Date().toLocaleString('pt-BR')
    };
  }
};
