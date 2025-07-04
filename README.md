# 🎯 RecruitAI - Sistema Inteligente de Recrutamento

![RecruitAI Banner](https://img.shields.io/badge/RecruitAI-Sistema%20de%20Recrutamento-blue?style=for-the-badge&logo=react)

Um sistema moderno e inteligente de recrutamento que utiliza **Inteligência Artificial** para fazer o matching perfeito entre candidatos e vagas de emprego.

## 🚀 **Funcionalidades Principais**

### 🤖 **Inteligência Artificial Avançada**
- **Algoritmo de compatibilidade** com 6 critérios ponderados
- **Análise semântica** de skills (reconhece similaridades)
- **Cálculo em tempo real** das compatibilidades
- **Machine Learning** para melhorar matches ao longo do tempo

### 👥 **Gestão de Candidatos**
- Cadastro completo com validação
- Dashboard com estatísticas em tempo real
- Sistema de ranking por compatibilidade
- Análise detalhada de gaps de competências

### 💼 **Gestão de Vagas**
- Catálogo de oportunidades com filtros avançados
- Informações detalhadas (salário, benefícios, localização)
- Sistema de status e níveis hierárquicos
- Matching automático com candidatos

### 📊 **Dashboard Analytics**
- Métricas de performance em tempo real
- Visualização de dados intuitiva
- Relatórios de compatibilidade
- Estatísticas de conversão

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React 18** - Framework principal
- **Tailwind CSS** - Estilização e design system
- **Lucide React** - Ícones modernos
- **Context API** - Gerenciamento de estado

### **Algoritmos IA**
- **Análise semântica** com Levenshtein Distance
- **Ponderação inteligente** de critérios
- **Normalização de scores** para comparação
- **Cálculo de similaridade** entre strings

### **Performance & UX**
- **Web Vitals** - Monitoramento de performance
- **Service Worker** - Suporte a PWA
- **Error Boundary** - Tratamento de erros
- **Lazy Loading** - Otimização de carregamento

## 📋 **Pré-requisitos**

- **Node.js** 16.0.0 ou superior
- **npm** 8.0.0 ou superior (ou **yarn** 1.22.0+)
- **Git** para controle de versão

## ⚡ **Instalação Rápida**

### 1. **Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/recruitai.git
cd recruitai
```

### 2. **Instale as Dependências**
```bash
npm install
# ou
yarn install
```

### 3. **Configure o Ambiente**
```bash
cp .env.example .env.local
# Edite as variáveis conforme necessário
```

### 4. **Inicie o Servidor de Desenvolvimento**
```bash
npm start
# ou
yarn start
```

### 5. **Acesse a Aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ **Estrutura do Projeto**

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes de interface
│   └── forms/           # Componentes de formulário
├── context/             # Context API para estado global
│   └── RecruitmentContext.js
├── pages/               # Páginas principais
│   └── RecruitmentDashboard.js
├── utils/               # Utilitários e helpers
│   └── compatibilityAlgorithm.js
├── hooks/               # Hooks customizados
├── styles/              # Arquivos de estilo
├── data/                # Dados mockados e constantes
└── tests/               # Testes automatizados
```

## 🧠 **Como Funciona a IA**

### **Algoritmo de Compatibilidade**

O sistema utiliza um algoritmo proprietário que analisa 6 critérios com pesos específicos:

```javascript
const WEIGHTS = {
  hardSkills: 0.30,      // 30% - Habilidades técnicas
  softSkills: 0.25,      // 25% - Competências comportamentais  
  experience: 0.20,      // 20% - Experiência profissional
  education: 0.15,       // 15% - Formação acadêmica
  languages: 0.07,       // 7% - Idiomas
  certifications: 0.03   // 3% - Certificações
};
```

### **Análise Semântica**

- **Não requer matches exatos** - reconhece "JavaScript" = "JS"
- **Algoritmo de distância** para calcular similaridade
- **Tolerância configurável** para diferentes níveis de match
- **Aprendizado contínuo** baseado em feedbacks

### **Scoring Inteligente**

- **Pontuação de 0-100%** para fácil interpretação
- **Cores dinâmicas**: Verde (80%+), Amarelo (60-79%), Vermelho (<60%)
- **Breakdown detalhado** por critério
- **Ranking automático** das melhores oportunidades

## 🎨 **Guia de Uso**

### **Dashboard**
- Visualize métricas em tempo real
- Acompanhe estatísticas de performance
- Acesse funcionalidades principais

### **Cadastro de Candidatos**
1. Acesse a aba "Análises" (cadastro)
2. Preencha dados pessoais
3. Adicione hard skills e soft skills
4. Informe experiência e formação
5. O sistema calcula automaticamente as compatibilidades

### **Visualização de Matches**
- Vá para "Candidatos" para ver todos os perfis
- Cada candidato mostra suas top 3 vagas compatíveis
- Clique em "Vagas" para ver oportunidades disponíveis
- Use filtros para refinar resultados

## 🧪 **Testes**

### **Executar Testes**
```bash
npm test
# ou
yarn test
```

### **Coverage**
```bash
npm run test:coverage
# ou
yarn test:coverage
```

### **Testes E2E**
```bash
npm run test:e2e
# ou
yarn test:e2e
```

## 📦 **Build para Produção**

### **Gerar Build**
```bash
npm run build
# ou
yarn build
```

### **Analisar Bundle**
```bash
npm run analyze
# ou
yarn analyze
```

### **Servir Build Local**
```bash
npm install -g serve
serve -s build
```

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### **Docker**
```bash
docker build -t recruitai .
docker run -p 3000:3000 recruitai
```

## 🔧 **Configuração Avançada**

### **Variáveis de Ambiente**
```env
REACT_APP_API_URL=https://api.recruitai.com
REACT_APP_ANALYTICS_ID=UA-XXXXXXXXX-X
REACT_APP_SENTRY_DSN=https://xxx@sentry.io/xxx
REACT_APP_VERSION=1.0.0
```

### **Personalização do Algoritmo**
Edite `src/utils/compatibilityAlgorithm.js` para ajustar:
- Pesos dos critérios
- Thresholds de similaridade
- Lógica de pontuação

### **Temas e Cores**
Modifique `tailwind.config.js` para personalizar:
- Paleta de cores
- Tipografia
- Espaçamentos
- Animações

## 📊 **Monitoramento**

### **Performance**
- Web Vitals automaticamente coletados
- Métricas de UX em tempo real
- Alertas de performance

### **Erros**
- Error Boundary para captura de erros
- Logs detalhados em desenvolvimento
- Integração com Sentry (opcional)

### **Analytics**
- Eventos de interação trackados
- Métricas de conversão
- Relatórios de uso

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Convenções de Commit**
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

## 📝 **Roadmap**

### **Versão 1.1**
- [ ] Upload de currículos em PDF
- [ ] Integração com LinkedIn
- [ ] Sistema de notificações
- [ ] Chat interno

### **Versão 1.2**
- [ ] Machine Learning avançado
- [ ] API REST completa
- [ ] Modo offline (PWA)
- [ ] Relatórios exportáveis

### **Versão 2.0**
- [ ] Multi-tenancy
- [ ] Integração com ATS externos
- [ ] Video entrevistas
- [ ] Análise de sentimentos

## 📄 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 **Equipe**

- **Desenvolvedor Principal** - [@seu-usuario](https://github.com/seu-usuario)
- **Designer UX/UI** - [@designer](https://github.com/designer)
- **Especialista IA** - [@ai-expert](https://github.com/ai-expert)

## 📞 **Suporte**

- **Email**: suporte@recruitai.com
- **Discord**: [Servidor RecruitAI](https://discord.gg/recruitai)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/recruitai/issues)
- **Documentação**: [docs.recruitai.com](https://docs.recruitai.com)

## 🙏 **Agradecimentos**

- [React Team](https://reactjs.org/) pelo framework incrível
- [Tailwind CSS](https://tailwindcss.com/) pelo design system
- [Lucide](https://lucide.dev/) pelos ícones elegantes
- Comunidade open source pelo suporte

---

<div align="center">

**Feito com ❤️ para revolucionar o recrutamento**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>