import { Request } from 'express';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    FRONTEND_URL?: string;
  }
}

declare global {
  var console: Console;
  var process: NodeJS.Process;
  var require: NodeRequire;
  var module: NodeModule;
  var __dirname: string;
  var __filename: string;
}

// Ensure Express Request types are available
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

export {};
