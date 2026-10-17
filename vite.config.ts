import { defineConfig } from 'vitest/config';
export default defineConfig({base:'./',build:{outDir:'dist',emptyOutDir:true,sourcemap:true},server:{host:'0.0.0.0'},test:{environment:'node',include:['src/**/*.test.ts']}});
