import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
