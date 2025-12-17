import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
      { ignores: ["dist", "node_modules", ".eslintrc.cjs"] },
      {
            files: ["**/*.{js,jsx}"],
            languageOptions: {
                  ecmaVersion: "latest",
                  sourceType: "module",
                  globals: {
                        ...globals.browser,
                        ...globals.es2020,
                        ...globals.node,
                  },
                  parserOptions: {
                        ecmaFeatures: { jsx: true },
                  },
            },
            plugins: {
                  react,
                  "react-hooks": reactHooks,
                  "react-refresh": reactRefresh,
                  prettier,
            },
            settings: {
                  react: { version: "18.2" },
            },
            rules: {
                  // Configurações base
                  ...js.configs.recommended.rules,
                  ...react.configs.recommended.rules,
                  ...react.configs["jsx-runtime"].rules,
                  ...reactHooks.configs.recommended.rules,
                  ...configPrettier.rules,

                  // Regras de limpeza
                  "react/jsx-no-target-blank": "off",
                  "react-refresh/only-export-components": [
                        "warn",
                        { allowConstantExport: true },
                  ],
                  "react/prop-types": "off",
                  "no-unused-vars": "warn",

                  // --- REGRAS DE ESPAÇAMENTO (ESTAS MANDAM AGORA) ---
                  "prettier/prettier": ["warn", { endOfLine: "auto" }],

                  // Espaçamento em JavaScript
                  "padding-line-between-statements": [
                        "warn",
                        { blankLine: "always", prev: "*", next: "return" },
                        {
                              blankLine: "always",
                              prev: "function",
                              next: "function",
                        },
                        {
                              blankLine: "always",
                              prev: ["const", "let", "var"],
                              next: "*",
                        },
                        {
                              blankLine: "any",
                              prev: ["const", "let", "var"],
                              next: ["const", "let", "var"],
                        },
                        { blankLine: "always", prev: "*", next: "export" },
                  ],

                  // Espaçamento em JSX (React)
                  "react/jsx-newline": ["warn", { prevent: false }],
                  "react/jsx-curly-newline": [
                        "warn",
                        { multiline: "consistent", singleline: "consistent" },
                  ],
                  "react/jsx-indent-props": ["warn", 4], // 4 deve ser igual ao seu tabWidth
                  "react/jsx-first-prop-new-line": ["warn", "multiline"],
                  "react/jsx-max-props-per-line": [
                        "warn",
                        { maximum: 1, when: "multiline" },
                  ],
            },
      },
];
