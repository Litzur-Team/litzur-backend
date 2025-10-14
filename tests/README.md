# Testes - Litzur Backend

Este documento descreve como executar e entender os testes implementados no projeto.

## Tipos de Testes

### 1. Testes Unitários
- **Localização**: `tests/unit/`
- **Objetivo**: Testar funções e classes isoladamente
- **Cobertura**: Repositories, Services, e Utilities

### 2. Testes de Integração
- **Localização**: `tests/integration/`
- **Objetivo**: Testar a API como um todo
- **Cobertura**: Endpoints da API e fluxos completos

## Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta automaticamente)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

## Estrutura dos Testes

```
tests/
├── setup.ts                           # Configuração global dos testes
├── unit/                              # Testes unitários
│   ├── repositories/
│   │   └── userRepository.test.ts     # Testes do UserRepository
│   ├── services/
│   │   └── userService.test.ts        # Testes do UserService
│   └── utils/
│       └── utilities.test.ts          # Testes de funções utilitárias
└── integration/
    └── user.api.test.ts               # Testes da API de usuários
```

## Tecnologias Utilizadas

- **Jest**: Framework de testes
- **ts-jest**: Suporte ao TypeScript no Jest
- **Supertest**: Testes de integração para APIs Express
- **@types/jest**: Tipos TypeScript para Jest

## Cobertura de Testes

### UserRepository
- ✅ Buscar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Criar novo usuário
- ✅ Atualizar usuário existente
- ✅ Deletar usuário

### UserService
- ✅ Validações de entrada
- ✅ Tratamento de erros
- ✅ Integração com Repository
- ✅ Regras de negócio

### API Endpoints
- ✅ GET /api/users
- ✅ GET /api/users/:id
- ✅ POST /api/users
- ✅ PUT /api/users/:id
- ✅ DELETE /api/users/:id

## Exemplos de Uso

### Executar apenas testes unitários
```bash
npx jest tests/unit
```

### Executar apenas testes de integração
```bash
npx jest tests/integration
```

### Executar testes com filtro
```bash
npx jest userService
```

### Executar testes em modo verbose
```bash
npx jest --verbose
```

## Mocks e Stubs

Os testes utilizam mocks para isolar as unidades de teste:

- **UserService**: Mock do UserRepository para testar lógica isoladamente
- **API Tests**: Testes reais contra a aplicação Express

## Configuração

A configuração do Jest está em `jest.config.js` e inclui:

- Suporte ao TypeScript com `ts-jest`
- Suporte ao ES Modules
- Mapeamento de paths (`@/*`)
- Configuração de cobertura
- Setup global em `tests/setup.ts`

## Adicionando Novos Testes

### Para adicionar testes unitários:
1. Crie um arquivo `.test.ts` em `tests/unit/[categoria]/`
2. Importe a função/classe a ser testada
3. Escreva os casos de teste usando `describe` e `it`

### Para adicionar testes de integração:
1. Crie um arquivo `.test.ts` em `tests/integration/`
2. Use `supertest` para fazer requisições à API
3. Teste cenários completos de uso

## Boas Práticas

- **AAA Pattern**: Arrange, Act, Assert
- **Nomes descritivos**: Use nomes claros para `describe` e `it`
- **Isolamento**: Cada teste deve ser independente
- **Cleanup**: Use `beforeEach` e `afterEach` quando necessário
- **Mocks**: Use mocks para dependências externas
- **Cobertura**: Busque cobertura alta mas significativa