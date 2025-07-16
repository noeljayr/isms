import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Keep your existing extended configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a new object to override and disable rules
  {
    rules: {
    // Disable the base JavaScript 'no-unused-vars' rule
      "no-unused-vars": "off",
      
      // Disable the TypeScript-specific 'no-unused-vars' rule
      "@typescript-eslint/no-unused-vars": "off",
      '@typescript-eslint/no-explicit-any': "off"

      // Add any other rules you want to disable here
      // "some-other-rule": "off",
    },
  },
];

export default eslintConfig;