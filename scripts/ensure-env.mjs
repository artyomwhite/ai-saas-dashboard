import { spawnSync } from "node:child_process";

const DEFAULT_DATABASE_URL = "file:./dev.db";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
}

const args = process.argv.slice(2);

if (args.length === 0) {
  process.exit(0);
}

const result = spawnSync(args.join(" "), {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

process.exit(result.status ?? 1);
