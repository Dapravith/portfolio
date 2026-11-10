import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Layer boundaries (see docs/portfolio/ARCHITECTURE.md). Imports point down only:
 *   app → features → components → lib → content / i18n
 * and server-only code (src/server, features/<name>/server) never reaches the browser.
 */
const noParent = { group: ["../*"], message: "Use the @/ alias instead of parent-relative imports." };
const serverCode = {
  group: ["@/server/*", "@/features/*/server/*"],
  message: "Server-only code cannot be imported here. Share types/schemas via features/<name>/schema.ts.",
};
const upperLayers = (...groups) => ({ group: groups, message: "Lower layers must not import higher ones." });
const restrict = (...patterns) => ({ "no-restricted-imports": ["error", { patterns: [noParent, ...patterns] }] });

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["src/**/*.{ts,tsx}"], rules: restrict() },
  {
    files: ["src/content/**", "src/i18n/**", "src/lib/**"],
    rules: restrict(serverCode, upperLayers("@/app/*", "@/features/*", "@/components/*")),
  },
  {
    files: ["src/components/**"],
    rules: restrict(serverCode, upperLayers("@/app/*", "@/features/*")),
  },
  {
    files: ["src/features/*/components/**", "src/features/*/schema.ts"],
    rules: restrict(serverCode, upperLayers("@/app/*")),
  },
  {
    files: ["src/server/**", "src/features/*/server/**"],
    rules: restrict(upperLayers("@/app/*", "@/components/*", "@/features/*/components/*")),
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
