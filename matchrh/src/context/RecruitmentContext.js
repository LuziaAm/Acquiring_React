// src/context/RecruitmentContext.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateCompatibility } from '../utils/compatibilityAlgorithm';

// Estado inicial
const initialState = {
  candidates: [
    {
      id: 1,
      nome: "João Santos",
      email: "joao.santos@email.com",
      telefone: "(11) 99999-9999",
      hardSkills: ["javascript", "react", "node.js", "sql", "git"],
      softSkills: ["trabalho em equipe", "resolução de problemas", "comunicação"],
      experiencia: 3,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["aws", "react"],
      avatar: "JS",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      telefone: "(21) 88888-8888",
      hardSkills: ["python", "data science", "machine learning", "sql"],
      softSkills: ["análise de dados", "pensamento crítico", "comunicação"],
      experiencia: 5,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["aws", "google cloud"],
      avatar: "CO",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      nome: "Maria Silva",
      email: "maria.silva@email.com",
      telefone: "(31) 77777-7777",
      hardSkills: ["figma", "adobe xd", "prototyping", "ui design"],
      softSkills: ["criatividade", "atenção aos detalhes", "colaboração"],
      experiencia: 4,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["ux certification"],
      avatar: "MS",
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      telefone: "(11) 66666-6666",
      hardSkills: ["vendas", "crm", "negociação", "excel"],
      softSkills: ["comunicação", "persuasão", "empatia"],
      experiencia: 2,
      formacao: "ensino médio",
      idiomas: ["português"],
      certificacoes: ["técnicas de vendas"],
      avatar: "AC",
      createdAt: new Date().toISOString()
    }
  ],
  jobs: [
    {
      id: 1,
      titulo: "Desenvolvedor Frontend React",
      empresa: "TechCorp Solutions",
      hardSkills: ["react", "javascript", "typescript", "css"],
      softSkills: ["trabalho em equipe", "resolução de problemas", "comunicação"],
      experiencia: 2,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["react"],
      salario: "R$ 6.000 - R$ 9.000",
      localizacao: "São Paulo, SP",
      status: "ativa",
      nivel: "pleno",
      candidatos: 3,
      dataPublicacao: "03 de jul",
      descricao: "Desenvolvimento de aplicações web modernas com React",
      tipoContrato: "CLT",
      beneficios: ["Home office", "Plano de saúde", "Vale refeição"]
    },
    {
      id: 2,
      titulo: "Data Scientist Sênior",
      empresa: "DataAnalytics Pro",
      hardSkills: ["python", "machine learning", "sql", "statistics"],
      softSkills: ["análise de dados", "pensamento crítico", "comunicação"],
      experiencia: 4,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["aws", "google cloud"],
      salario: "R$ 12.000 - R$ 18.000",
      localizacao: "Rio de Janeiro, RJ",
      status: "ativa",
      nivel: "senior",
      candidatos: 3,
      dataPublicacao: "03 de jul",
      descricao: "Análise de dados e desenvolvimento de modelos de ML",
      tipoContrato: "CLT",
      beneficios: ["Flexibilidade", "Plano de saúde", "Stock options"]
    },
    {
      id: 3,
      titulo: "Designer UX/UI",
      empresa: "Creative Studio",
      hardSkills: ["figma", "adobe xd", "prototyping", "design systems"],
      softSkills: ["criatividade", "atenção aos detalhes", "colaboração"],
      experiencia: 3,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["ux certification"],
      salario: "R$ 5.000 - R$ 8.000",
      localizacao: "Belo Horizonte, MG",
      status: "ativa",
      nivel: "pleno",
      candidatos: 3,
      dataPublicacao: "03 de jul",
      descricao: "Design de interfaces e experiência do usuário",
      tipoContrato: "CLT",
      beneficios: ["Horário flexível", "Plano de saúde"]
    }
  ],
  compatibilities: {},
  activeTab: 'dashboard',
  filters: {
    experienceMin: 0,
    experienceMax: 10,
    formation: 'all',
    location: 'all',
    compatibilityMin: 0
  },
  loading: false,
  error: null
};

// Actions
const ACTIONS = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  ADD_CANDIDATE: 'ADD_CANDIDATE',
  UPDATE_CANDIDATE: 'UPDATE_CANDIDATE',
  REMOVE_CANDIDATE: 'REMOVE_CANDIDATE',
  ADD_JOB: 'ADD_JOB',
  UPDATE_JOB: 'UPDATE_JOB',
  REMOVE_JOB: 'REMOVE_JOB',
  CALCULATE_COMPATIBILITIES: 'CALCULATE_COMPATIBILITIES',
  SET_FILTERS: 'SET_FILTERS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

// Reducer
const recruitmentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };

    case ACTIONS.ADD_CANDIDATE:
      const newCandidate = {
        ...action.payload,
        id: Date.now(),
        avatar: action.payload.nome.split(' ').map(n => n[0]).join('').toUpperCase(),
        createdAt: new Date().toISOString()
      };
      
      const updatedCandidates = [...state.candidates, newCandidate];
      
      // Calcular compatibilidades para o novo candidato
      const newCompatibilities = { ...state.compatibilities };
      state.jobs.forEach(job => {
        const compatibility = calculateCompatibility(newCandidate, job);
        newCompatibilities[`${newCandidate.id}_${job.id}`] = compatibility;
      });

      return {
        ...state,
        candidates: updatedCandidates,
        compatibilities: newCompatibilities
      };

    case ACTIONS.UPDATE_CANDIDATE:
      const candidateIndex = state.candidates.findIndex(c => c.id === action.payload.id);
      if (candidateIndex === -1) return state;

      const updatedCandidatesList = [...state.candidates];
      updatedCandidatesList[candidateIndex] = {
        ...action.payload,
        updatedAt: new Date().toISOString()
      };

      // Recalcular compatibilidades para o candidato atualizado
      const recalculatedCompatibilities = { ...state.compatibilities };
      state.jobs.forEach(job => {
        const compatibility = calculateCompatibility(action.payload, job);
        recalculatedCompatibilities[`${action.payload.id}_${job.id}`] = compatibility;
      });

      return {
        ...state,
        candidates: updatedCandidatesList,
        compatibilities: recalculatedCompatibilities
      };

    case ACTIONS.REMOVE_CANDIDATE:
      const filteredCandidates = state.candidates.filter(c => c.id !== action.payload);
      
      // Remover compatibilidades do candidato removido
      const cleanedCompatibilities = { ...state.compatibilities };
      Object.keys(cleanedCompatibilities).forEach(key => {
        if (key.startsWith(`${action.payload}_`)) {
          delete cleanedCompatibilities[key];
        }
      });

      return {
        ...state,
        candidates: filteredCandidates,
        compatibilities: cleanedCompatibilities
      };

    case ACTIONS.CALCULATE_COMPATIBILITIES:
      const allCompatibilities = {};
      
      state.candidates.forEach(candidate => {
        state.jobs.forEach(job => {
          const compatibility = calculateCompatibility(candidate, job);
          allCompatibilities[`${candidate.id}_${job.id}`] = compatibility;
        });
      });

      return {
        ...state,
        compatibilities: allCompatibilities
      };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ACTIONS.LOAD_FROM_STORAGE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Context
const RecruitmentContext = createContext();

// Provider
export const RecruitmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recruitmentReducer, initialState);

  // Calcular compatibilidades iniciais
  useEffect(() => {
    dispatch({ type: ACTIONS.CALCULATE_COMPATIBILITIES });
  }, []);

  // Persistência no localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('recruitment-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.candidates && parsedData.candidates.length > 0) {
          dispatch({
            type: ACTIONS.LOAD_FROM_STORAGE,
            payload: {
              candidates: parsedData.candidates || [],
              compatibilities: parsedData.compatibilities || {}
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, []);

  // Salvar no localStorage quando estado mudar
  useEffect(() => {
    const dataToSave = {
      candidates: state.candidates,
      compatibilities: state.compatibilities
    };
    localStorage.setItem('recruitment-data', JSON.stringify(dataToSave));
  }, [state.candidates, state.compatibilities]);

  // Actions
  const actions = {
    setActiveTab: (tab) => {
      dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab });
    },

    addCandidate: (candidate) => {
      dispatch({ type: ACTIONS.ADD_CANDIDATE, payload: candidate });
    },

    updateCandidate: (candidate) => {
      dispatch({ type: ACTIONS.UPDATE_CANDIDATE, payload: candidate });
    },

    removeCandidate: (candidateId) => {
      dispatch({ type: ACTIONS.REMOVE_CANDIDATE, payload: candidateId });
    },

    setFilters: (filters) => {
      dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    },

    recalculateCompatibilities: () => {
      dispatch({ type: ACTIONS.CALCULATE_COMPATIBILITIES });
    },

    setLoading: (loading) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
    }
  };

  // Getters computados
  const getters = {
    getCompatibilityForCandidate: (candidateId) => {
      return state.jobs.map(job => ({
        job,
        compatibility: state.compatibilities[`${candidateId}_${job.id}`] || { percentage: 0, level: 'low' }
      })).sort((a, b) => b.compatibility.percentage - a.compatibility.percentage);
    },

    getCompatibilityForJob: (jobId) => {
      return state.candidates.map(candidate => ({
        candidate,
        compatibility: state.compatibilities[`${candidate.id}_${jobId}`] || { percentage: 0, level: 'low' }
      })).sort((a, b) => b.compatibility.percentage - a.compatibility.percentage);
    },

    getFilteredCandidates: () => {
      return state.candidates.filter(candidate => {
        const exp = candidate.experiencia || 0;
        const minComp = state.filters.compatibilityMin || 0;
        
        // Filtro de experiência
        if (exp < state.filters.experienceMin || exp > state.filters.experienceMax) {
          return false;
        }
        
        // Filtro de formação
        if (state.filters.formation !== 'all' && candidate.formacao !== state.filters.formation) {
          return false;
        }
        
        // Filtro de compatibilidade mínima (baseado na melhor vaga)
        const bestCompatibility = Math.max(
          ...state.jobs.map(job => 
            (state.compatibilities[`${candidate.id}_${job.id}`] || { percentage: 0 }).percentage
          ),
          0
        );
        
        if (bestCompatibility < minComp) {
          return false;
        }
        
        return true;
      });
    },

    getTopMatches: (limit = 5) => {
      const allMatches = [];
      
      state.candidates.forEach(candidate => {
        state.jobs.forEach(job => {
          const compatibility = state.compatibilities[`${candidate.id}_${job.id}`];
          if (compatibility) {
            allMatches.push({
              candidate,
              job,
              compatibility
            });
          }
        });
      });
      
      return allMatches
        .sort((a, b) => b.compatibility.percentage - a.compatibility.percentage)
        .slice(0, limit);
    },

    getStatistics: () => {
      const totalCandidates = state.candidates.length;
      const totalJobs = state.jobs.length;
      const totalMatches = Object.keys(state.compatibilities).length;
      
      const compatibilityValues = Object.values(state.compatibilities)
        .map(comp => comp.percentage);
      
      const averageCompatibility = compatibilityValues.length > 0
        ? Math.round(compatibilityValues.reduce((a, b) => a + b, 0) / compatibilityValues.length)
        : 0;
      
      const highMatches = compatibilityValues.filter(comp => comp >= 80).length;
      const mediumMatches = compatibilityValues.filter(comp => comp >= 60 && comp < 80).length;
      const lowMatches = compatibilityValues.filter(comp => comp < 60).length;
      
      return {
        totalCandidates,
        totalJobs,
        totalMatches,
        averageCompatibility,
        matchDistribution: {
          high: highMatches,
          medium: mediumMatches,
          low: lowMatches
        }
      };
    }
  };

  const value = {
    ...state,
    ...actions,
    ...getters
  };

  return (
    <RecruitmentContext.Provider value={value}>
      {children}
    </RecruitmentContext.Provider>
  );
};

// Hook customizado
export const useRecruitment = () => {
  const context = useContext(RecruitmentContext);
  if (!context) {
    throw new Error('useRecruitment deve ser usado dentro de RecruitmentProvider');
  }
  return context;
};