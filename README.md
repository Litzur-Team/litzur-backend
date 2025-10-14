# Litzur Backend

Uma API REST robusta e escalável construída com Node.js, Express e TypeScript, seguindo os princípios de Clean Architecture.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Superset tipado do JavaScript
- **Clean Architecture** - Padrão arquitetural para código limpo e manutenível

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Camada de apresentação (API)
│   ├── controllers/        # Controladores da API
│   └── routes/            # Definição das rotas
├── config/                # Configurações da aplicação
├── core/                  # Lógica de negócio central
│   ├── repositories/      # Camada de acesso a dados
│   └── services/          # Serviços de domínio
├── types/                 # Definições de tipos TypeScript
├── app.ts                 # Configuração da aplicação Express
└── server.ts              # Ponto de entrada do servidor
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/litzur-backend.git
cd litzur-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
# Build do projeto
npm run build

# Iniciar em produção
npm run start:prod
```

### Build apenas
```bash
npm run build
```

## 📚 API Endpoints

### Usuários

| Método | Endpoint        | Descrição                    |
|--------|----------------|------------------------------|
| GET    | `/api/users`   | Listar todos os usuários     |
| GET    | `/api/users/:id` | Buscar usuário por ID      |
| POST   | `/api/users`   | Criar novo usuário           |
| PUT    | `/api/users/:id` | Atualizar usuário          |
| DELETE | `/api/users/:id` | Deletar usuário            |

### Exemplo de Requisição

```bash
# Criar usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com"
  }'
```

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

- **API Layer** (`api/`): Responsável pela comunicação HTTP
- **Service Layer** (`core/services/`): Contém a lógica de negócio
- **Repository Layer** (`core/repositories/`): Abstração do acesso a dados
- **Types** (`types/`): Definições de tipos compartilhados

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento com hot-reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa o servidor compilado
- `npm run start:prod` - Build + Start em sequência

## 📦 Dependências Principais

### Produção
- **express**: Framework web para Node.js
- **dotenv**: Gerenciamento de variáveis de ambiente

### Desenvolvimento
- **typescript**: Compilador TypeScript
- **tsx**: Executor TypeScript com hot-reload
- **@types/express**: Tipagens do Express
- **@types/node**: Tipagens do Node.js

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como parte do Projeto Integrador da FATEC.

---

⭐ Deixe uma estrela se este projeto te ajudou!

Backend API em TypeScript com Express.js para o projeto Litzur.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **dotenv** - Carregamento de variáveis de ambiente

## Estrutura do Projeto

```
src/
├── api/
│   ├── controllers/     # Controladores da API
│   └── routes/         # Definição das rotas
├── config/             # Configurações da aplicação
├── core/
│   ├── repositories/   # Camada de acesso aos dados
│   └── services/       # Lógica de negócio
├── types/              # Definições de tipos TypeScript
├── app.ts              # Configuração do Express
└── server.ts           # Ponto de entrada da aplicação
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em produção (após build)
- `npm run start:prod` - Build e start em produção

## Desenvolvimento

Para desenvolvimento, use:

```bash
npm run dev
```

O servidor será iniciado na porta 3000 (ou na porta definida na variável de ambiente PORT).

## Build para Produção

```bash
npm run build
npm start
```

## API Endpoints

### Usuários

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `POST /api/users` - Cria novo usuário
- `PUT /api/users/:id` - Atualiza usuário
- `DELETE /api/users/:id` - Remove usuário

### Exemplo de Payload para Criação de Usuário

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com"
}
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request