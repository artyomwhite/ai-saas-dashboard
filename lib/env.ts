const DEFAULT_DATABASE_URL = "file:./dev.db";

export function ensureDatabaseUrl(): string {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
  }

  return process.env.DATABASE_URL;
}
