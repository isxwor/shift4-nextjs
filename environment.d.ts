export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SHIFT4_PUBLIC_KEY: string;
    }
  }
}
