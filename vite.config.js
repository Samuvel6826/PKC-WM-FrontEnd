import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    build: 'inline',
    plugins: [react()],
    define: {
      'process.env': {
        VITE_API_URL: env.VITE_API_URL,
        VITE_API_KEY: env.VITE_API_KEY,
        VITE_AUTH_DOMAIN: env.VITE_AUTH_DOMAIN,
        VITE_DATABASE_URL: env.VITE_DATABASE_URL,
        VITE_PROJECT_ID: env.VITE_PROJECT_ID,
        VITE_STORAGE_BUCKET: env.VITE_STORAGE_BUCKET,
        VITE_MESSAGING_SENDER_ID: env.VITE_MESSAGING_SENDER_ID,
        VITE_APP_ID: env.VITE_APP_ID,
        VITE_MEASUREMENT_ID: env.VITE_MEASUREMENT_ID,
        // Add other environment variables here
      },
    },
  };
});
