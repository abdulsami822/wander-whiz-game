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
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "game-core": ["@/contexts/GameContext", "@/lib/supabase"],
          "ui-components": [
            "@/components/ui/button",
            "@/components/ui/dialog",
            "@/components/ui/progress",
            "@/components/ui/select",
            "@/components/ui/toast",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
}));
