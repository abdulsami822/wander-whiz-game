import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // All node_modules in one vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // All app code in one chunk
          if (id.includes("/src/")) {
            return "app";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
}));
