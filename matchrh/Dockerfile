# Multi-stage Dockerfile para RecruitAI
# Otimizado para produção com melhor performance e segurança

# =======================
# STAGE 1: Build Stage
# =======================
FROM node:18-alpine AS builder

# Metadados da imagem
LABEL maintainer="RecruitAI Team <dev@recruitai.com>"
LABEL description="Sistema Inteligente de Recrutamento com IA"
LABEL version="1.0.0"

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (para cache do Docker)
COPY package*.json ./
COPY yarn.lock* ./

# Configurar npm para produção
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fund false
RUN npm config set audit-level moderate

# Instalar dependências
RUN npm ci --only=production --silent

# Copiar código fonte
COPY . .

# Argumentos de build
ARG REACT_APP_VERSION=1.0.0
ARG REACT_APP_BUILD_TIME
ARG REACT_APP_GIT_COMMIT
ARG NODE_ENV=production

# Definir variáveis de ambiente para build
ENV REACT_APP_VERSION=$REACT_APP_VERSION
ENV REACT_APP_BUILD_TIME=$REACT_APP_BUILD_TIME
ENV REACT_APP_GIT_COMMIT=$REACT_APP_GIT_COMMIT
ENV NODE_ENV=$NODE_ENV
ENV GENERATE_SOURCEMAP=false
ENV INLINE_RUNTIME_CHUNK=false

# Build da aplicação
RUN npm run build

# Otimizar arquivos estáticos
RUN find build -name "*.js" -exec gzip -k {} \;
RUN find build -name "*.css" -exec gzip -k {} \;
RUN find build -name "*.html" -exec gzip -k {} \;

# =======================
# STAGE 2: Production Stage
# =======================
FROM nginx:1.24-alpine AS production

# Instalar dependências de segurança
RUN apk add --no-cache \
    curl \
    tzdata \
    && rm -rf /var/cache/apk/*

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S recruitai -u 1001

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados do stage anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Criar arquivo de saúde para health check
RUN echo '<!DOCTYPE html><html><head><title>Health Check</title></head><body><h1>OK</h1></body></html>' > /usr/share/nginx/html/health

# Configurar permissões
RUN chown -R recruitai:nodejs /usr/share/nginx/html
RUN chown -R recruitai:nodejs /var/cache/nginx
RUN chown -R recruitai:nodejs /var/log/nginx
RUN chown -R recruitai:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R recruitai:nodejs /var/run/nginx.pid

# Configurar timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NGINX_WORKER_PROCESSES=auto
ENV NGINX_WORKER_CONNECTIONS=1024

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Mudar para usuário não-root
USER recruitai

# Labels adicionais para metadados
LABEL org.opencontainers.image.title="RecruitAI"
LABEL org.opencontainers.image.description="Sistema Inteligente de Recrutamento"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/your-username/recruitai"
LABEL org.opencontainers.image.vendor="RecruitAI Team"
LABEL org.opencontainers.image.licenses="MIT"

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

# =======================
# STAGE 3: Development Stage (opcional)
# =======================
FROM node:18-alpine AS development

WORKDIR /app

# Instalar dependências globais para desenvolvimento
RUN npm install -g nodemon concurrently

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies)
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta de desenvolvimento
EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "start"]