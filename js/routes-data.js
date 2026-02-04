/**
 * Database de Rotas Brasileiras
 * Contém 40 rotas populares entre capitais e regiões
 */

const RoutesDB = {
  // Mapa de distâncias entre cidades (em km)
  routes: [
    // Região Sudeste
    { origin: 'São Paulo', destination: 'Rio de Janeiro', distance: 430 },
    { origin: 'São Paulo', destination: 'Belo Horizonte', distance: 586 },
    { origin: 'São Paulo', destination: 'Brasília', distance: 1015 },
    { origin: 'Rio de Janeiro', destination: 'Belo Horizonte', distance: 435 },
    { origin: 'Rio de Janeiro', destination: 'Brasília', distance: 1200 },
    { origin: 'Belo Horizonte', destination: 'Brasília', distance: 740 },
    { origin: 'São Paulo', destination: 'Campinas', distance: 100 },
    { origin: 'São Paulo', destination: 'Sorocaba', distance: 108 },

    // Região Nordeste
    { origin: 'Salvador', destination: 'Recife', distance: 790 },
    { origin: 'Salvador', destination: 'Fortaleza', distance: 1200 },
    { origin: 'Recife', destination: 'Fortaleza', distance: 780 },
    { origin: 'Salvador', destination: 'João Pessoa', distance: 560 },
    { origin: 'Recife', destination: 'João Pessoa', distance: 180 },
    { origin: 'Brasília', destination: 'Salvador', distance: 1500 },

    // Região Sul
    { origin: 'Curitiba', destination: 'Porto Alegre', distance: 710 },
    { origin: 'São Paulo', destination: 'Curitiba', distance: 408 },
    { origin: 'Curitiba', destination: 'Florianópolis', distance: 400 },
    { origin: 'Rio de Janeiro', destination: 'Curitiba', distance: 700 },
    { origin: 'Florianópolis', destination: 'Porto Alegre', distance: 520 },

    // Região Norte
    { origin: 'Manaus', destination: 'Belém', distance: 1400 },
    { origin: 'Brasília', destination: 'Manaus', distance: 2900 },
    { origin: 'Brasília', destination: 'Palmas', distance: 1100 },

    // Região Centro-Oeste
    { origin: 'Brasília', destination: 'Goiânia', distance: 209 },
    { origin: 'Brasília', destination: 'Cuiabá', distance: 913 },
    { origin: 'Goiânia', destination: 'Cuiabá', distance: 930 },

    // Rotas bidirecionais (complemento)
    { origin: 'Rio de Janeiro', destination: 'São Paulo', distance: 430 },
    { origin: 'Belo Horizonte', destination: 'São Paulo', distance: 586 },
    { origin: 'Brasília', destination: 'São Paulo', distance: 1015 },
    { origin: 'Belo Horizonte', destination: 'Rio de Janeiro', distance: 435 },
    { origin: 'Brasília', destination: 'Rio de Janeiro', distance: 1200 },
    { origin: 'Brasília', destination: 'Belo Horizonte', distance: 740 },
    { origin: 'Campinas', destination: 'São Paulo', distance: 100 },
    { origin: 'Sorocaba', destination: 'São Paulo', distance: 108 },
    { origin: 'Recife', destination: 'Salvador', distance: 790 },
    { origin: 'Fortaleza', destination: 'Salvador', distance: 1200 },
    { origin: 'Fortaleza', destination: 'Recife', distance: 780 },
    { origin: 'João Pessoa', destination: 'Salvador', distance: 560 },
    { origin: 'João Pessoa', destination: 'Recife', distance: 180 },
    { origin: 'Porto Alegre', destination: 'Curitiba', distance: 710 },
    { origin: 'Curitiba', destination: 'São Paulo', distance: 408 },
    { origin: 'Florianópolis', destination: 'Curitiba', distance: 400 },
    { origin: 'Curitiba', destination: 'Rio de Janeiro', distance: 700 },
    { origin: 'Porto Alegre', destination: 'Florianópolis', distance: 520 },
    { origin: 'Belém', destination: 'Manaus', distance: 1400 },
    { origin: 'Manaus', destination: 'Brasília', distance: 2900 },
    { origin: 'Palmas', destination: 'Brasília', distance: 1100 },
    { origin: 'Goiânia', destination: 'Brasília', distance: 209 },
    { origin: 'Cuiabá', destination: 'Brasília', distance: 913 },
    { origin: 'Cuiabá', destination: 'Goiânia', distance: 930 },
  ],

  /**
   * Retorna lista única e ordenada de todas as cidades
   * @returns {Array<string>} Lista de cidades ordenadas alfabeticamente
   */
  getAllCities() {
    const cities = new Set();
    this.routes.forEach(route => {
      cities.add(route.origin);
      cities.add(route.destination);
    });
    return Array.from(cities).sort();
  },

  /**
   * Encontra a distância entre duas cidades
   * @param {string} origin - Cidade de origem
   * @param {string} destination - Cidade de destino
   * @returns {number|null} Distância em km ou null se não encontrada
   */
  findDistance(origin, destination) {
    if (!origin || !destination) return null;
    
    // Normaliza as strings para comparação (remove espaços e converte para minúsculas)
    const originNorm = origin.trim().toLowerCase();
    const destNorm = destination.trim().toLowerCase();

    const route = this.routes.find(
      r => r.origin.toLowerCase() === originNorm && r.destination.toLowerCase() === destNorm
    );

    return route ? route.distance : null;
  },

  /**
   * Adiciona uma nova rota ao banco de dados
   * @param {string} origin - Cidade de origem
   * @param {string} destination - Cidade de destino
   * @param {number} distance - Distância em km
   */
  addRoute(origin, destination, distance) {
    if (origin && destination && distance > 0) {
      this.routes.push({
        origin: origin.trim(),
        destination: destination.trim(),
        distance: parseFloat(distance)
      });
    }
  }
};
