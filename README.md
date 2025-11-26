# Litzur Backend

Uma API REST robusta e escalável construída com Node.js, Express, TypeScript e Prisma, seguindo os princípios de Clean Architecture.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Superset tipado do JavaScript
- **Prisma** - ORM moderno para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação com JSON Web Tokens
- **Bcrypt** - Hash seguro de senhas
- **Zod** - Validação de schemas
- **Swagger** - Documentação interativa da API
- **Jest** - Framework de testes
- **Clean Architecture** - Padrão arquitetural para código limpo e manutenível

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Camada de apresentação (API)
│   ├── controllers/        # Controladores da API (User, Auth, LandingPage, Lead)
│   ├── routes/            # Definição das rotas
│   └── validators/        # Validadores Zod para request body
├── application/           # Casos de uso da aplicação
│   └── useCases/         # Use cases específicos
├── config/                # Configurações da aplicação
│   ├── index.ts          # Configurações gerais
│   └── swagger.config.ts # Configuração do Swagger
├── core/                  # Lógica de negócio central
│   ├── repositories/      # Camada de acesso a dados (Prisma)
│   └── services/          # Serviços de domínio
├── middleware/            # Middlewares Express
│   ├── authenticateJWT.ts # Autenticação JWT
│   └── validateBody.ts   # Validação de body
├── types/                 # Definições de tipos TypeScript
├── utils/                 # Utilitários
│   ├── jwt.ts            # Funções JWT
│   └── prisma.ts         # Cliente Prisma
├── app.ts                 # Configuração da aplicação Express
└── server.ts              # Ponto de entrada do servidor

prisma/
├── schema.prisma          # Schema do banco de dados
└── migrations/            # Migrações do banco
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Litzur-Team/litzur-backend.git
cd litzur-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
```

**Variáveis necessárias no `.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
PORT=8000
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production"
JWT_EXPIRES_IN="1h"
NODE_ENV="development"
```

4. Configure o banco de dados:
```bash
# Gere o Prisma Client
npx prisma generate

# Execute as migrations
npx prisma migrate dev
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```
O servidor será iniciado em `http://localhost:8000`

### Produção
```bash
# Build + Start
npm run start:prod

# Ou separadamente
npm run build
npm start
```

### Testes
```bash
# Executar todos os testes
npm test

# Modo watch
npm run test:watch

# Com coverage
npm run test:coverage
```

## 📚 API Endpoints

### 🔓 Rotas Públicas

#### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/login` | Fazer login e obter token JWT |
| POST | `/api/users` | Criar novo usuário (registro) |

#### Leads
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/leads` | Criar lead (formulário público) |

#### Landing Pages
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/landing-pages/slug/:slug` | Buscar landing page por slug |

### 🔒 Rotas Protegidas (Requerem JWT)

#### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users` | Listar todos os usuários |
| GET | `/api/users/:id` | Buscar usuário por ID |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Deletar usuário |

#### Landing Pages
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/landing-pages` | Listar todas as landing pages |
| GET | `/api/landing-pages/:id` | Buscar landing page por ID |
| GET | `/api/landing-pages/user/:userId` | Landing pages de um usuário |
| POST | `/api/landing-pages` | Criar nova landing page |
| PUT | `/api/landing-pages/:id` | Atualizar landing page |
| DELETE | `/api/landing-pages/:id` | Deletar landing page |

#### Leads
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/leads` | Listar todos os leads |
| GET | `/api/leads/:id` | Buscar lead por ID |
| GET | `/api/leads/page/:pageId` | Leads de uma landing page |
| GET | `/api/leads/search?email=...` | Buscar leads por email |
| PUT | `/api/leads/:id` | Atualizar lead |
| DELETE | `/api/leads/:id` | Deletar lead |

### Exemplos de Requisições

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "password": "senha123"
  }'

# 2. Fazer login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "password": "senha123"
  }'

# 3. Listar usuários (com token)
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer seu-token-jwt-aqui"

# 4. Criar landing page (com token)
curl -X POST http://localhost:3000/api/landing-pages \
  -H "Authorization: Bearer seu-token-jwt-aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Campanha Black Friday",
    "slug": "black-friday-2025",
    "published": true,
    "content": {},
    "userId": "uuid-do-usuario"
  }'

# 5. Criar lead (público - formulário)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "cliente@exemplo.com",
    "customerName": "Cliente Nome",
    "pageId": "uuid-da-landing-page"
  }'
```

## 📖 Documentação Interativa

Acesse a documentação Swagger completa em: **`http://localhost:3000/docs`**

Na documentação você pode:
- Ver todos os endpoints disponíveis
- Testar requisições diretamente
- Ver schemas de request/response
- Autenticar com JWT clicando no botão "Authorize"

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

### Camadas

1. **API Layer** (`api/`)
   - Controllers: Recebem requisições HTTP
   - Routes: Definem endpoints e middlewares
   - Validators: Validam dados de entrada com Zod

2. **Application Layer** (`application/`)
   - Use Cases: Orquestram a lógica de negócio

3. **Domain Layer** (`core/`)
   - Services: Lógica de negócio central
   - Repositories: Abstração do acesso a dados (Prisma)

4. **Infrastructure** (`utils/`, `middleware/`)
   - Prisma Client
   - JWT utilities
   - Middlewares (autenticação, validação)

### Fluxo de Dados

```
Request → Route → Middleware → Controller → Service → Repository → Database
                     ↓
                Validation (Zod)
                Authentication (JWT)
```

## 🗄️ Modelo de Dados

### User (Usuário)
```typescript
{
  id: string (UUID)
  email: string (único)
  password: string (hash bcrypt)
  name: string?
  createdAt: DateTime
  pages: LandingPage[] (relacionamento)
}
```

### LandingPage
```typescript
{
  id: string (UUID)
  title: string
  slug: string (único)
  published: boolean
  content: JSON
  createdAt: DateTime
  updatedAt: DateTime
  userId: string (FK)
  leads: Lead[] (relacionamento)
}
```

### Lead
```typescript
{
  id: string (UUID)
  customerEmail: string
  customerName: string?
  submittedAt: DateTime
  pageId: string (FK)
}
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor em modo desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm start` | Executa o servidor compilado (produção) |
| `npm run start:prod` | Build + Start em sequência |
| `npm test` | Executa todos os testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com relatório de cobertura |

## 📦 Dependências Principais

### Produção
- **express** `^5.1.0` - Framework web para Node.js
- **@prisma/client** `^7.0.1` - ORM para banco de dados
- **@prisma/adapter-pg** `^7.0.1` - Adaptador PostgreSQL
- **pg** `^8.16.3` - Driver PostgreSQL
- **jsonwebtoken** `^9.0.2` - Geração e validação de JWT
- **bcrypt** `^6.0.0` - Hash de senhas
- **zod** `^3.22.4` - Validação de schemas
- **cors** `^2.8.5` - Middleware CORS
- **swagger-jsdoc** `^6.2.8` - Geração de documentação Swagger
- **swagger-ui-express** `^5.0.1` - Interface Swagger UI
- **dotenv** `^17.2.3` - Gerenciamento de variáveis de ambiente

### Desenvolvimento
- **typescript** `^5.9.3` - Compilador TypeScript
- **tsx** `^4.20.6` - Executor TypeScript com hot-reload
- **prisma** `^7.0.1` - CLI do Prisma
- **jest** `^30.2.0` - Framework de testes
- **supertest** `^7.1.4` - Testes de API HTTP
- **ts-jest** `^29.4.5` - Preset Jest para TypeScript
- Diversos `@types/*` - Tipagens TypeScript

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ Autenticação JWT com token expirável
- ✅ Validação de dados com Zod
- ✅ Proteção de rotas sensíveis
- ✅ CORS configurado
- ⚠️ **Importante**: Altere o `JWT_SECRET` em produção!

## 🚀 Deploy

### Preparação para Produção

1. Configure as variáveis de ambiente de produção
2. Altere `NODE_ENV=production`
3. Use um `JWT_SECRET` forte e único
4. Configure o PostgreSQL em produção
5. Execute as migrations: `npx prisma migrate deploy`

### Plataformas Recomendadas
- **Backend**: Railway, Render, Heroku, DigitalOcean
- **Database**: Supabase, Neon, Railway PostgreSQL

## 🧪 Testes

A API possui cobertura de testes:
- ✅ Testes unitários (repositories, services)
- ✅ Testes de integração (API endpoints)
- ✅ Utilities

Execute: `npm run test:coverage` para ver o relatório completo.

## 🛠️ Desenvolvimento

### Prisma Studio
Para visualizar e editar dados do banco:
```bash
npx prisma studio
```

### Criar Nova Migration
```bash
npx prisma migrate dev --name nome_da_migration
```

### Reset do Banco
```bash
npx prisma migrate reset
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Equipe

Desenvolvido pela **Litzur Team** como parte do Projeto Integrador da FATEC.

---

⭐ **Deixe uma estrela se este projeto te ajudou!**

📚 **Documentação completa:** `http://localhost:3000/docs`