// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string; // or number if you parse it
    DATABASE_URL: string;
    SECRET_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test'; // Example of a limited set of values
    MONGODB_URL: string;
    ELYSIA_API_PORT: string;
    ENABLE_MONGO_CONNECTION: 'true' | 'false';
    ELYSIA_API_DOMAIN: string;
  }
}
