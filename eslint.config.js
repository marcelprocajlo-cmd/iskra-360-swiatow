import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
export default tseslint.config({ignores:['dist/**','node_modules/**','legacy/**','releases/**']},js.configs.recommended,...tseslint.configs.recommendedTypeChecked.map(c=>({...c,files:['src/**/*.ts','vite.config.ts']})),{files:['src/**/*.ts','vite.config.ts'],languageOptions:{globals:{...globals.browser,...globals.node},parserOptions:{projectService:true,tsconfigRootDir:import.meta.dirname}},rules:{'@typescript-eslint/no-explicit-any':'error'}});
