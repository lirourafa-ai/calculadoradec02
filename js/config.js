/**
 * Configuração e Inicialização da Aplicação
 * Define fatores de emissão, modos de transporte e créditos de carbono
 */

const CONFIG = {
  // Fatores de emissão em kg CO₂/km
  EMISSION_FACTORS: {
    bicicleta: 0,          // Emissão zero
    carro: 0.12,           // 120g CO₂ por km (carro médio)
    onibus: 0.089,         // 89g CO₂ por km (ônibus com média de passageiros)
    caminhao: 0.96         // 960g CO₂ por km
  },

  // Metadados dos modos de transporte
  TRANSPORT_MODES: {
    bicicleta: {
      label: 'Bicicleta',
      icon: '🚴',
      color: '#34d399',
      description: 'Zero emissão de carbono'
    },
    carro: {
      label: 'Carro',
      icon: '🚗',
      color: '#f59e0b',
      description: 'Emissão média'
    },
    onibus: {
      label: 'Ônibus',
      icon: '🚌',
      color: '#3b82f6',
      description: 'Emissão baixa (compartilhada)'
    },
    caminhao: {
      label: 'Caminhão',
      icon: '🚚',
      color: '#ef4444',
      description: 'Emissão alta'
    }
  },

  // Configuração de créditos de carbono
  CARBON_CREDIT: {
    price: 25,              // Preço em R$ por tonelada de CO₂
    conversion: 1000        // 1 crédito = 1000 kg de CO₂ evitado
  },

  /**
   * Popula o datalist com cidades disponíveis
   */
  populateDatalist() {
    const datalistElement = document.getElementById('cities-list');
    if (!datalistElement) return;

    const cities = RoutesDB.getAllCities();
    datalistElement.innerHTML = '';

    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      datalistElement.appendChild(option);
    });
  },

  /**
   * Configura o autopreenchimento inteligente de distância
   */
  setupDistanceAutofill() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    const manualCheckbox = document.getElementById('manual-distance');

    const updateDistance = () => {
      if (manualCheckbox.checked) {
        distanceInput.readOnly = false;
        distanceInput.placeholder = 'Digite a distância em km';
        distanceInput.value = '';
      } else {
        distanceInput.readOnly = true;
        const distance = RoutesDB.findDistance(
          originInput.value,
          destinationInput.value
        );

        if (distance) {
          distanceInput.value = distance;
          distanceInput.placeholder = 'Distância preenchida automaticamente';
        } else {
          distanceInput.value = '';
          distanceInput.placeholder = 'Rota não encontrada - ative manual';
        }
      }
    };

    // Listeners
    originInput.addEventListener('change', updateDistance);
    destinationInput.addEventListener('change', updateDistance);
    manualCheckbox.addEventListener('change', updateDistance);
  },

  /**
   * Inicializa a aplicação
   */
  init() {
    this.populateDatalist();
    this.setupDistanceAutofill();
  }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  CONFIG.init();
});
