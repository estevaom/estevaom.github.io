import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../dist",
  },
  server: {
    proxy: {
      "/dist/api": {
        target: "http://localhost:5173",
        rewrite: (path) => path.replace(/^\/dist/, ""),
      },
    },
  },
  publicDir: "public",
});
