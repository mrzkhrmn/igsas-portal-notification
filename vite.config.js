import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://igsas-portal-bildirim.ranna.com.tr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true,
      },
      "/igmo-api": {
        target: "https://portalapi.yildiz.com/api/Igmo",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/igmo-api/, ""),
        secure: true,
      },
      "/auth-api": {
        target: "https://portalapi.yildiz.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth-api/, ""),
        secure: true,
      },
    },
  },
});
