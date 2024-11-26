import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend server URL
        changeOrigin: false, // Needed to true for virtual hosted sites
      },
    },
  },
  plugins: [react()],
});
