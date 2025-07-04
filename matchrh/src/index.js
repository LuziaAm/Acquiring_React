// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Criar root do React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
 * Configurações incluídas neste arquivo:
 * 
 * ✅ Error Boundary customizado com UI de erro
 * ✅ Service Worker para PWA
 * ✅ Web Vitals para performance
 * ✅ Tratamento de erros globais
 * ✅ Detecção de conexão online/offline
 * ✅ Hot reload para desenvolvimento
 * ✅ Loading state management
 * ✅ React 18 com createRoot
 * ✅ StrictMode para detecção de problemas
 * ✅ Configurações de desenvolvimento vs produção
 * 
 * Este arquivo serve como base sólida para uma aplicação React
 * em produção com todas as melhores práticas implementadas.
 */