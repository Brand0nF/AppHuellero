declare module 'bcryptjs' {
    export function hash(data: string, salt: number | string): string;
    export function compare(data: string, encrypted: string): boolean;
  }