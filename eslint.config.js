import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["node_modules", "dist", "build", ".next"],
    rules: {
      "no-console": "warn"
    }
  }
];
