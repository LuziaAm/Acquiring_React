// src/reportWebVitals.js

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Versão simplificada - apenas log no console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals habilitado');
    }
  }
};

export default reportWebVitals;