import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/Igmo": {
        target: "https://portalapi.yildiz.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/Igmo/, "/api/Igmo"),
      },
      "/api": {
        target: "https://igsas-portal-bildirim.ranna.com.tr",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
