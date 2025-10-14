// Declarações de tipos globais para o projeto

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV?: 'development' | 'production' | 'test';
    }
  }
}

export {};