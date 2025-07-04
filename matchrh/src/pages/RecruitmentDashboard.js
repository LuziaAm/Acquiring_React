import React, { useState } from 'react';
import { 
  Briefcase, 
  Star, 
  Globe, 
  BookOpen, 
  TrendingUp, 
  Search, 
  Plus, 
  X,
  CheckCircle,
  BarChart3,
  Users,
  Target,
  Calendar,
  MapPin,
  Settings,
  Bell,
  Home
} from 'lucide-react';

const SmartRecruitmentApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [candidatos, setCandidatos] = useState([
    {
      id: 1,
      nome: "João Santos",
      email: "joao.santos@email.com",
      hardSkills: ["javascript", "react", "node.js", "sql", "git"],
      softSkills: ["trabalho em equipe", "resolução de problemas", "comunicação"],
      experiencia: 3,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["aws", "react"],
      avatar: "JS"
    },
    {
      id: 2,
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      hardSkills: ["python", "data science", "machine learning", "sql"],
      softSkills: ["análise de dados", "pensamento crítico", "comunicação"],
      experiencia: 5,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["aws", "google cloud"],
      avatar: "CO"
    },
    {
      id: 3,
      nome: "Maria Silva",
      email: "maria.silva@email.com",
      hardSkills: ["figma", "adobe xd", "prototyping", "ui design"],
      softSkills: ["criatividade", "atenção aos detalhes", "colaboração"],
      experiencia: 4,
      formacao: "superior",
      idiomas: ["português", "inglês"],
      certificacoes: ["ux certification"],
      avatar: "MS"
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      hardSkills: ["vendas", "crm", "negociação", "excel"],
      softSkills: ["comunicação", "persuasão", "empatia"],
      experiencia: 2,
      formacao: "ensino médio",
      idiomas: ["português"],
      certificacoes: ["técnicas de vendas"],
      avatar: "AC"
    }
  ]);
  
  const vagas = [
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
      dataPublicacao: "03 de jul"
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
      dataPublicacao: "03 de jul"
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
      dataPublicacao: "03 de jul"
    }
  ];
  
  const [novoCandidato, setNovoCandidato] = useState({
    nome: '',
    email: '',
    telefone: '',
    hardSkills: [],
    softSkills: [],
    experiencia: 0,
    formacao: 'ensino médio',
    idiomas: [],
    certificacoes: []
  });
  
  const [novaSkill, setNovaSkill] = useState('');
  const [compatibilidades, setCompatibilidades] = useState({});

  // Funções para gerenciar skills


  const calcularCompatibilidade = (candidato, vaga) => {
    let pontuacao = 0;

    // Hard Skills (30%)
    const hardSkillsMatch = candidato.hardSkills.filter(skill => 
      vaga.hardSkills.some(vagaSkill => 
        skill.toLowerCase().includes(vagaSkill.toLowerCase()) ||
        vagaSkill.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    const hardSkillsScore = Math.min((hardSkillsMatch / vaga.hardSkills.length) * 30, 30);
    pontuacao += hardSkillsScore;

    // Soft Skills (25%)
    const softSkillsMatch = candidato.softSkills.filter(skill => 
      vaga.softSkills.some(vagaSkill => 
        skill.toLowerCase().includes(vagaSkill.toLowerCase()) ||
        vagaSkill.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    const softSkillsScore = Math.min((softSkillsMatch / vaga.softSkills.length) * 25, 25);
    pontuacao += softSkillsScore;

    // Experiência (20%)
    const experienciaScore = candidato.experiencia >= vaga.experiencia ? 20 : 
                           (candidato.experiencia / vaga.experiencia) * 20;
    pontuacao += experienciaScore;

    // Formação (15%)
    const nivelFormacao = {
      'ensino fundamental': 1,
      'ensino médio': 2,
      'técnico': 3,
      'superior': 4,
      'pós-graduação': 5,
      'mestrado': 6,
      'doutorado': 7
    };
    const formacaoScore = nivelFormacao[candidato.formacao] >= nivelFormacao[vaga.formacao] ? 15 : 
                         (nivelFormacao[candidato.formacao] / nivelFormacao[vaga.formacao]) * 15;
    pontuacao += formacaoScore;

    // Idiomas (7%)
    const idiomasMatch = candidato.idiomas.filter(idioma => 
      vaga.idiomas.includes(idioma)
    ).length;
    const idiomasScore = Math.min((idiomasMatch / vaga.idiomas.length) * 7, 7);
    pontuacao += idiomasScore;

    // Certificações (3%)
    const certificacoesMatch = candidato.certificacoes.filter(cert => 
      vaga.certificacoes.some(vagaCert => 
        cert.toLowerCase().includes(vagaCert.toLowerCase()) ||
        vagaCert.toLowerCase().includes(cert.toLowerCase())
      )
    ).length;
    const certificacoesScore = vaga.certificacoes.length > 0 ? 
      Math.min((certificacoesMatch / vaga.certificacoes.length) * 3, 3) : 3;
    pontuacao += certificacoesScore;

    return Math.round(pontuacao);
  };

  const adicionarCandidato = () => {
    if (novoCandidato.nome && novoCandidato.email) {
      const candidatoComId = {
        ...novoCandidato,
        id: Date.now(),
        avatar: novoCandidato.nome.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setCandidatos([...candidatos, candidatoComId]);
      
      // Calcular compatibilidades
      const novasCompatibilidades = {};
      vagas.forEach(vaga => {
        const compatibilidade = calcularCompatibilidade(candidatoComId, vaga);
        novasCompatibilidades[`${candidatoComId.id}_${vaga.id}`] = compatibilidade;
      });
      setCompatibilidades(prev => ({...prev, ...novasCompatibilidades}));
      
      // Limpar formulário
      setNovoCandidato({
        nome: '',
        email: '',
        telefone: '',
        hardSkills: [],
        softSkills: [],
        experiencia: 0,
        formacao: 'ensino médio',
        idiomas: [],
        certificacoes: []
      });
    }
  };

  const adicionarSkill = (tipo) => {
    if (novaSkill.trim()) {
      setNovoCandidato(prev => ({
        ...prev,
        [tipo]: [...prev[tipo], novaSkill.trim()]
      }));
      setNovaSkill('');
    }
  };

  const removerSkill = (tipo, index) => {
    setNovoCandidato(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter((_, i) => i !== index)
    }));
  };

  const getCompatibilidadesPorCandidato = (candidatoId) => {
    return vagas.map(vaga => ({
      vaga,
      compatibilidade: compatibilidades[`${candidatoId}_${vaga.id}`] || 0
    })).sort((a, b) => b.compatibilidade - a.compatibilidade);
  };

  const getAvatarColor = (index) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500'];
    return colors[index % colors.length];
  };

  const getStatusBadge = (status, nivel) => {
    const statusColors = {
      ativa: 'bg-green-100 text-green-800',
      pausada: 'bg-yellow-100 text-yellow-800',
      fechada: 'bg-gray-100 text-gray-800'
    };
    
    const nivelColors = {
      junior: 'bg-blue-100 text-blue-800',
      pleno: 'bg-purple-100 text-purple-800',
      senior: 'bg-orange-100 text-orange-800'
    };

    return { statusColors, nivelColors };
  };

  const renderSidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RecruitAI</h1>
            <p className="text-sm text-gray-500">Recrutamento Inteligente</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('vagas')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
              activeTab === 'vagas' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Vagas</span>
          </button>
          
          <button
            onClick={() => setActiveTab('candidatos')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
              activeTab === 'candidatos' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Candidatos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analises')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
              activeTab === 'analises' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Análises</span>
          </button>
        </nav>

        {/* Stats Rápidas */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">STATS RÁPIDAS</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vagas Ativas</span>
              <span className="text-sm font-semibold text-gray-900">{vagas.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Candidaturas</span>
              <span className="text-sm font-semibold text-gray-900">{candidatos.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Match Médio</span>
              <span className="text-sm font-semibold text-gray-900">73%</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">RH</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Equipe RH</p>
            <p className="text-xs text-gray-500 truncate">Gestão de Talentos</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Recrutamento</h1>
          <p className="text-gray-600 mt-1">Visão geral do processo seletivo inteligente</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vagas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">{vagas.length}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Candidaturas</p>
              <p className="text-3xl font-bold text-gray-900">{candidatos.length}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23% esta semana
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Match Médio</p>
              <p className="text-3xl font-bold text-gray-900">70%</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5% vs. mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contratações</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Meta: 15/mês
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vagas Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Vagas Recentes
            </h2>
            <button 
              onClick={() => setActiveTab('vagas')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas
            </button>
          </div>
          
          <div className="space-y-4">
            {vagas.slice(0, 3).map((vaga) => {
              const { statusColors, nivelColors } = getStatusBadge(vaga.status, vaga.nivel);
              return (
                <div key={vaga.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{vaga.titulo}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[vaga.status]}`}>
                        {vaga.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${nivelColors[vaga.nivel]}`}>
                        {vaga.nivel}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{vaga.empresa}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vaga.localizacao}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {vaga.dataPublicacao}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {vaga.candidatos} candidatos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Candidatos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-600" />
              Top Candidatos
            </h2>
            <button 
              onClick={() => setActiveTab('candidatos')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos
            </button>
          </div>
          
          <div className="space-y-4">
            {candidatos.slice(0, 4).map((candidato, index) => {
              const melhorMatch = Math.max(
                ...vagas.map(vaga => calcularCompatibilidade(candidato, vaga))
              );
              
              return (
                <div key={candidato.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getAvatarColor(index)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-medium text-sm">{candidato.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{candidato.nome}</h3>
                      <p className="text-sm text-gray-500">#{index + 1} colocado</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      melhorMatch >= 80 ? 'text-green-600' :
                      melhorMatch >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {melhorMatch}%
                    </div>
                    <p className="text-xs text-gray-500">Match alto</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVagas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas</h1>
          <p className="text-gray-600 mt-1">Gerencie todas as oportunidades disponíveis</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nova Vaga
        </button>
      </div>

      <div className="grid gap-6">
        {vagas.map(vaga => (
          <div key={vaga.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{vaga.titulo}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(vaga.status, vaga.nivel).statusColors[vaga.status]}`}>
                      {vaga.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(vaga.status, vaga.nivel).nivelColors[vaga.nivel]}`}>
                      {vaga.nivel}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{vaga.empresa}</p>
                <p className="text-green-600 font-semibold text-lg">{vaga.salario}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Candidatos</p>
                <p className="text-2xl font-bold text-gray-900">{vaga.candidatos}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Hard Skills</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {vaga.hardSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Soft Skills</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {vaga.softSkills.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-800">Requisitos</span>
                </div>
                <p className="text-sm text-purple-700">
                  {vaga.experiencia} anos de experiência
                </p>
                <p className="text-sm text-purple-700 capitalize">{vaga.formacao}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vaga.localizacao}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Publicado em {vaga.dataPublicacao}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Ver Candidatos
                </button>
                <button className="text-gray-600 hover:text-gray-700 font-medium">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidatos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Candidatos</h1>
          <p className="text-gray-600 mt-1">Acompanhe todos os talentos da sua base</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar candidatos..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {candidatos.map((candidato, index) => {
          const compatibilidades = getCompatibilidadesPorCandidato(candidato.id);
          const melhorMatch = compatibilidades[0];

          return (
            <div key={candidato.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold">{candidato.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{candidato.nome}</h3>
                    <p className="text-gray-600">{candidato.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{candidato.experiencia} anos de experiência</p>
                  </div>
                </div>
                
                {melhorMatch && (
                  <div className={`px-4 py-2 rounded-lg ${
                    melhorMatch.compatibilidade >= 80 ? 'bg-green-100 text-green-800' :
                    melhorMatch.compatibilidade >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{melhorMatch.compatibilidade}%</div>
                      <p className="text-xs opacity-75">Melhor Match</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Hard Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidato.hardSkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidato.hardSkills.length > 3 && (
                      <span className="text-blue-600 text-xs">+{candidato.hardSkills.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Soft Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidato.softSkills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidato.softSkills.length > 2 && (
                      <span className="text-green-600 text-xs">+{candidato.softSkills.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-800">Formação</span>
                  </div>
                  <p className="text-sm text-purple-700 capitalize">{candidato.formacao}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Globe className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="font-medium text-orange-800">Idiomas</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    {candidato.idiomas.join(', ') || 'Não informado'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Compatibilidade com Vagas</h4>
                <div className="space-y-2">
                  {compatibilidades.slice(0, 3).map(({ vaga, compatibilidade }) => (
                    <div key={vaga.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-800">{vaga.titulo}</span>
                        <p className="text-sm text-gray-600">{vaga.empresa}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        compatibilidade >= 80 ? 'bg-green-100 text-green-800' :
                        compatibilidade >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {compatibilidade}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCadastro = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cadastrar Novo Candidato</h1>
        <p className="text-gray-600 mt-1">Adicione um novo talento à sua base de candidatos</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={novoCandidato.nome}
              onChange={(e) => setNovoCandidato(prev => ({...prev, nome: e.target.value}))}
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={novoCandidato.email}
              onChange={(e) => setNovoCandidato(prev => ({...prev, email: e.target.value}))}
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={novoCandidato.telefone}
              onChange={(e) => setNovoCandidato(prev => ({...prev, telefone: e.target.value}))}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anos de Experiência
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={novoCandidato.experiencia}
              onChange={(e) => setNovoCandidato(prev => ({...prev, experiencia: parseInt(e.target.value) || 0}))}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formação Acadêmica
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={novoCandidato.formacao}
            onChange={(e) => setNovoCandidato(prev => ({...prev, formacao: e.target.value}))}
          >
            <option value="ensino fundamental">Ensino Fundamental</option>
            <option value="ensino médio">Ensino Médio</option>
            <option value="técnico">Técnico</option>
            <option value="superior">Superior</option>
            <option value="pós-graduação">Pós-graduação</option>
            <option value="mestrado">Mestrado</option>
            <option value="doutorado">Doutorado</option>
          </select>
        </div>

        {/* Skills Forms */}
        {['hardSkills', 'softSkills', 'idiomas', 'certificacoes'].map((skillType) => {
          const labels = {
            hardSkills: 'Hard Skills',
            softSkills: 'Soft Skills',
            idiomas: 'Idiomas',
            certificacoes: 'Certificações'
          };
          
          const colors = {
            hardSkills: 'blue',
            softSkills: 'green',
            idiomas: 'orange',
            certificacoes: 'red'
          };
          
          const color = colors[skillType];
          
          return (
            <div key={skillType} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {labels[skillType]}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={novaSkill}
                  onChange={(e) => setNovaSkill(e.target.value)}
                  placeholder={`Adicionar ${labels[skillType].toLowerCase()}...`}
                  onKeyPress={(e) => e.key === 'Enter' && adicionarSkill(skillType)}
                />
                <button
                  onClick={() => adicionarSkill(skillType)}
                  className={`px-4 py-2 bg-${color}-500 text-white rounded-md hover:bg-${color}-600 transition-colors`}
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {novoCandidato[skillType].map((item, index) => (
                  <span key={index} className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                    {item}
                    <button
                      onClick={() => removerSkill(skillType, index)}
                      className={`text-${color}-600 hover:text-${color}-800`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        <div className="flex justify-end">
          <button
            onClick={adicionarCandidato}
            disabled={!novoCandidato.nome || !novoCandidato.email}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cadastrar Candidato
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'vagas' && renderVagas()}
          {activeTab === 'candidatos' && renderCandidatos()}
          {activeTab === 'analises' && renderCadastro()}
        </div>
      </div>
    </div>
  );
};

export default SmartRecruitmentApp;