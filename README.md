# 🍃 Calculadora de Emissão de Carbono

Uma aplicação web interativa para calcular a emissão de CO₂ de viagens entre cidades brasileiras e comparar diferentes modos de transporte.

## ✨ Características

- 🚗 **4 Modos de Transporte**: Bicicleta, Carro, Ônibus e Caminhão
- 📍 **40+ Rotas Brasileiras**: Capitais e regiões principais
- 🔄 **Autocompletar Inteligente**: Sugestão de cidades em tempo real
- 📊 **Análise Comparativa**: Compare emissões entre diferentes modos
- 💚 **Créditos de Carbono**: Calcule compensação ambiental
- 📱 **Design Responsivo**: Funciona em mobile, tablet e desktop
- 🎨 **Interface Moderna**: Paleta eco-friendly com animações suaves

## 🚀 Como Usar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Suporte a ES6+

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/lirourafa-ai/calculadoradec02.git
cd calculadoradec02
```

2. Abra o arquivo `index.html` no navegador:
   - Duplo clique em `index.html`, ou
   - Clique direito → "Abrir com" → Navegador

### Uso

1. **Preencha origem e destino**: Digite cidades brasileiras (autocomplete disponível)
2. **Selecione modo**: Escolha entre 🚴 🚗 🚌 🚚
3. **Distância automática**: Preenchida automaticamente para rotas conhecidas
4. **Manual**: Marque para inserir distância personalizada
5. **Calcule**: Clique em "Calcular Emissão"
6. **Analise**: Veja emissões, comparações e créditos

## 📊 Exemplo de Resultado

```
Rota: São Paulo → Rio de Janeiro
Distância: 430 km
Modo: Carro
─────────────────────────────
Emissão: 51.6 kg CO₂
Economia vs Ônibus: 19.9% menos
Créditos necessários: 0.0516
Árvores para absorver: 3/ano
```

## 📁 Estrutura do Projeto

```
calculadoradec02/
├── index.html                    # Estrutura HTML5 semântica
├── css/
│   └── style.css               # Estilos modernos (CSS Grid, Flexbox)
├── js/
│   ├── routes-data.js          # Base de dados com rotas brasileiras
│   ├── config.js               # Configuração e inicialização
│   ├── calculator.js           # Motor de cálculo de emissões
│   ├── ui.js                   # Gerenciador de interface
│   └── app.js                  # Inicialização e eventos
├── .gitignore                   # Arquivos ignorados pelo Git
└── README.md                    # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Semântica e estrutura
- **CSS3**: Variáveis CSS, Grid, Flexbox, Animações
- **JavaScript Vanilla**: Sem dependências externas
- **Locale PT-BR**: Formatação brasileira

## 🎨 Paleta de Cores

| Cor | Uso | Hex |
|-----|-----|-----|
| Verde Primário | Elementos principais | `#10b981` |
| Verde Escuro | Hovers e destaque | `#059669` |
| Verde Claro | Acentos | `#34d399` |
| Vermelho | Erros e perigo | `#ef4444` |
| Amarelo | Avisos | `#f59e0b` |
| Azul | Informações | `#3b82f6` |

## 📈 Fatores de Emissão (kg CO₂/km)

| Modo | Emissão | Descrição |
|------|---------|-----------|
| 🚴 Bicicleta | 0.00 | Zero emissão |
| 🚌 Ônibus | 0.089 | Mais eficiente |
| 🚗 Carro | 0.12 | Emissão média |
| 🚚 Caminhão | 0.96 | Maior emissão |

## 🌍 Rotas Disponíveis

O projeto inclui rotas entre principais capitais:

- **Região Sudeste**: São Paulo, Rio de Janeiro, Belo Horizonte, Brasília
- **Região Nordeste**: Salvador, Recife, Fortaleza, João Pessoa
- **Região Sul**: Curitiba, Porto Alegre, Florianópolis
- **Região Norte**: Manaus, Belém, Palmas
- **Região Centro-Oeste**: Brasília, Goiânia, Cuiabá

## 💡 Funcionalidades Detalhadas

### Autocompletar Inteligente
- Lista de cidades atualizada automaticamente
- Sugestões enquanto você digita
- Busca case-insensitive

### Distância Automática
- Sistema de busca por rotas conhecidas
- Preenchimento automático para viagens populares
- Opção de inserir distância manual

### Cálculos Precisos
- Emissão do modo selecionado
- Comparação com todos os modos
- Economia percentual
- Conversão para créditos de carbono
- Estimativa em R$

### Interface Responsiva
- Mobile: 2 colunas no grid de transporte
- Tablet: 3 colunas de resultados
- Desktop: 4 colunas de transporte

## 🎯 Próximas Melhorias

- [ ] Integração com API de rotas reais
- [ ] Armazenamento de histórico (LocalStorage)
- [ ] Modo dark/light
- [ ] Exportar relatórios em PDF
- [ ] Integração com mapas
- [ ] Contribuição de usuários para novas rotas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ✉️ Contato

Rafael - [GitHub](https://github.com/lirourafa-ai)

## 🙏 Agradecimentos

- Inspirado em iniciativas de sustentabilidade ambiental
- Dados de emissão baseados em estudos ambientais
- Design inspirado em aplicações modernas eco-friendly

---

**Desenvolvido com 💚 para um futuro mais sustentável**
