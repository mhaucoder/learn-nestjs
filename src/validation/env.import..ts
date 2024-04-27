export class EnvImport {
    public static getEnv(key: string): string {
      if (!process.env[key]) throw Error(`${key} environment variable is required`);
      return process.env[key] as string;
    }
  }
  