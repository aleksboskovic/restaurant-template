import { defineConfig } from "vitest/config";
import path from "path";
import fs from "fs";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
    env: (() => {
      const envPath = path.resolve(templateRoot, ".env");
      if (!fs.existsSync(envPath)) return {};
      return Object.fromEntries(
        fs.readFileSync(envPath, "utf-8")
          .split("\n")
          .filter((l: string) => l && !l.startsWith("#") && l.includes("="))
          .map((l: string) => {
            const idx = l.indexOf("=");
            return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()] as [string, string];
          })
          .filter(([k]: [string]) => k)
      );
    })(),
  },
});
