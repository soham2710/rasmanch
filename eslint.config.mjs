// eslint.config.mjs - Fixed configuration with Google Translate overrides
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Override for Google Translate components
  {
    files: ["**/GoogleTranslate/**/*.ts", "**/GoogleTranslate/**/*.tsx", "**/types/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow any for Google Translate API
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
  
  // Global overrides for better development experience
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  
  // Ignore patterns for build and dependencies
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
      "public/**",
    ],
  },
];

export default eslintConfig;