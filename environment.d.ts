declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site
      BASE_URL: string;
      // Services
      DUNE_API_KEY: string;
    }
  }
}

export {};
