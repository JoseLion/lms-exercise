declare namespace NodeJS {

  interface ProcessEnv {
    API_PORT: number;
    API_URL?: string;
    NODE_ENV: "production" | "test";
    REQUEST_TIMEOUT?: number;
  }
}
