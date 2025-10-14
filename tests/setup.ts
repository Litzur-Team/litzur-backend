// Setup global para testes
// Define timeout padrão para testes
jest.setTimeout(10000);

// Mock console.log para evitar poluição nos testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};