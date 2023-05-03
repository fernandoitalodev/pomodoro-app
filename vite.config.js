import { defineConfig } from 'vite'

import babel from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),reactRefresh()]
})
