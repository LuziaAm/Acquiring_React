// src/utils/compatibilityAlgorithm.js

/**
 * Algoritmo de Inteligência Artificial para cálculo de compatibilidade
 * entre candidatos e vagas de emprego - Versão Atualizada
 */

// Pesos para cada critério de avaliação
const WEIGHTS = {
  hardSkills: 0.30,     // 30% - Habilidades técnicas
  softSkills: 0.25,     // 25% - Competências comportamentais  
  experience: 0.20,     // 20% - Experiência profissional
  education: 0.15,      // 15% - Formação acadêmica
  languages: 0.07,      // 7% - Idiomas
  certifications: 0.03  // 3% - Certificações
};

// Níveis de formação acadêmica (hierárquicos)
const EDUCATION_LEVELS = {
  'ensino fundamental': 1,
  'ensino médio': 2,
  'técnico': 3,
  'superior': 4,
  'pós-graduação': 5,
  'mestrado': 6,
  'doutorado': 7
};

/**
 * Calcula a similaridade entre duas strings usando algoritmo de distância
 * @param {string} str1 - Primeira string
 * @param {string} str2 - Segunda string
 * @returns {number} - Pontuação de similaridade (0-1)
 */
const calculateStringSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  // Match exato
  if (s1 === s2) return 1;
  
  // Verifica se uma string contém a outra
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Calcula similaridade usando Levenshtein distance
  const maxLength = Math.max(s1.length, s2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(s1, s2);
  return Math.max(0, 1 - distance / maxLength);
};

/**
 * Algoritmo de Levenshtein para calcular distância entre strings
 * @param {string} str1 
 * @param {string} str2 
 * @returns {number}
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * Calcula compatibilidade de skills usando IA semântica
 * @param {Array} candidateSkills - Skills do candidato
 * @param {Array} jobSkills - Skills requeridas pela vaga
 * @returns {number} - Pontuação (0-1)
 */
const calculateSkillsCompatibility = (candidateSkills, jobSkills) => {
  if (!jobSkills || jobSkills.length === 0) return 1;
  if (!candidateSkills || candidateSkills.length === 0) return 0;
  
  let totalScore = 0;
  let matchedSkills = 0;
  
  for (const jobSkill of jobSkills) {
    let bestMatch = 0;
    
    for (const candidateSkill of candidateSkills) {
      const similarity = calculateStringSimilarity(candidateSkill, jobSkill);
      bestMatch = Math.max(bestMatch, similarity);
    }
    
    // Considera como match se similaridade >= 0.6
    if (bestMatch >= 0.6) {
      matchedSkills++;
      totalScore += bestMatch;
    }
  }
  
  // Retorna a média ponderada dos matches
  return matchedSkills > 0 ? totalScore / jobSkills.length : 0;
};

/**
 * Calcula compatibilidade de experiência
 * @param {number} candidateExp - Anos de experiência do candidato
 * @param {number} jobExp - Anos requeridos pela vaga
 * @returns {number} - Pontuação (0-1)
 */
const calculateExperienceCompatibility = (candidateExp, jobExp) => {
  if (candidateExp >= jobExp) return 1;
  if (jobExp === 0) return 1;
  
  // Aplica uma curva suave para experiência insuficiente
  const ratio = candidateExp / jobExp;
  return Math.pow(ratio, 0.7); // Curva menos penalizante
};

/**
 * Calcula compatibilidade de formação acadêmica
 * @param {string} candidateEdu - Formação do candidato
 * @param {string} jobEdu - Formação requerida
 * @returns {number} - Pontuação (0-1)
 */
const calculateEducationCompatibility = (candidateEdu, jobEdu) => {
  const candidateLevel = EDUCATION_LEVELS[candidateEdu] || 0;
  const jobLevel = EDUCATION_LEVELS[jobEdu] || 0;
  
  if (candidateLevel >= jobLevel) return 1;
  if (jobLevel === 0) return 1;
  
  // Penalidade suave para formação inferior
  return Math.max(0.3, candidateLevel / jobLevel);
};

/**
 * Calcula compatibilidade de idiomas
 * @param {Array} candidateLanguages - Idiomas do candidato
 * @param {Array} jobLanguages - Idiomas requeridos
 * @returns {number} - Pontuação (0-1)
 */
const calculateLanguagesCompatibility = (candidateLanguages, jobLanguages) => {
  if (!jobLanguages || jobLanguages.length === 0) return 1;
  if (!candidateLanguages || candidateLanguages.length === 0) return 0;
  
  const matches = jobLanguages.filter(jobLang =>
    candidateLanguages.some(candLang =>
      calculateStringSimilarity(candLang, jobLang) >= 0.8
    )
  );
  
  return matches.length / jobLanguages.length;
};

/**
 * Função principal: Calcula compatibilidade total entre candidato e vaga
 * @param {Object} candidate - Dados do candidato
 * @param {Object} job - Dados da vaga
 * @returns {Object} - Resultado detalhado da análise
 */
export const calculateCompatibility = (candidate, job) => {
  // Cálculo individual de cada critério
  const hardSkillsScore = calculateSkillsCompatibility(
    candidate.hardSkills || [],
    job.hardSkills || []
  );
  
  const softSkillsScore = calculateSkillsCompatibility(
    candidate.softSkills || [],
    job.softSkills || []
  );
  
  const experienceScore = calculateExperienceCompatibility(
    candidate.experiencia || 0,
    job.experiencia || 0
  );
  
  const educationScore = calculateEducationCompatibility(
    candidate.formacao || 'ensino médio',
    job.formacao || 'ensino médio'
  );
  
  const languagesScore = calculateLanguagesCompatibility(
    candidate.idiomas || [],
    job.idiomas || []
  );
  
  const certificationsScore = calculateSkillsCompatibility(
    candidate.certificacoes || [],
    job.certificacoes || []
  );
  
  // Cálculo da pontuação final ponderada
  const totalScore = (
    hardSkillsScore * WEIGHTS.hardSkills +
    softSkillsScore * WEIGHTS.softSkills +
    experienceScore * WEIGHTS.experience +
    educationScore * WEIGHTS.education +
    languagesScore * WEIGHTS.languages +
    certificationsScore * WEIGHTS.certifications
  );
  
  // Converte para porcentagem
  const percentage = Math.round(totalScore * 100);
  
  return {
    percentage,
    breakdown: {
      hardSkills: Math.round(hardSkillsScore * 100),
      softSkills: Math.round(softSkillsScore * 100),
      experience: Math.round(experienceScore * 100),
      education: Math.round(educationScore * 100),
      languages: Math.round(languagesScore * 100),
      certifications: Math.round(certificationsScore * 100)
    },
    level: percentage >= 80 ? 'high' : percentage >= 60 ? 'medium' : 'low'
  };
};

/**
 * Calcula compatibilidades para múltiplas vagas
 * @param {Object} candidate - Candidato
 * @param {Array} jobs - Lista de vagas
 * @returns {Array} - Lista ordenada por compatibilidade
 */
export const calculateMultipleCompatibilities = (candidate, jobs) => {
  return jobs
    .map(job => ({
      job,
      compatibility: calculateCompatibility(candidate, job)
    }))
    .sort((a, b) => b.compatibility.percentage - a.compatibility.percentage);
};

/**
 * Analisa gaps de competências do candidato para uma vaga específica
 * @param {Object} candidate - Candidato
 * @param {Object} job - Vaga
 * @returns {Object} - Análise de gaps
 */
export const analyzeSkillGaps = (candidate, job) => {
  const missingHardSkills = (job.hardSkills || []).filter(jobSkill =>
    !(candidate.hardSkills || []).some(candSkill =>
      calculateStringSimilarity(candSkill, jobSkill) >= 0.6
    )
  );
  
  const missingSoftSkills = (job.softSkills || []).filter(jobSkill =>
    !(candidate.softSkills || []).some(candSkill =>
      calculateStringSimilarity(candSkill, jobSkill) >= 0.6
    )
  );
  
  const missingLanguages = (job.idiomas || []).filter(jobLang =>
    !(candidate.idiomas || []).some(candLang =>
      calculateStringSimilarity(candLang, jobLang) >= 0.8
    )
  );
  
  const missingCertifications = (job.certificacoes || []).filter(jobCert =>
    !(candidate.certificacoes || []).some(candCert =>
      calculateStringSimilarity(candCert, jobCert) >= 0.6
    )
  );
  
  return {
    missingHardSkills,
    missingSoftSkills,
    missingLanguages,
    missingCertifications,
    experienceGap: Math.max(0, (job.experiencia || 0) - (candidate.experiencia || 0)),
    educationGap: Math.max(0, EDUCATION_LEVELS[job.formacao] - EDUCATION_LEVELS[candidate.formacao])
  };
};