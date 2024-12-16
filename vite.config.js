import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src/",
  publicDir: "../public",
  base: "/",
  server: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        animal: resolve(__dirname, "src/pages/animal.html"),
        endangered: resolve(__dirname, "src/pages/endangered.html"),
        extint: resolve(__dirname, "src/pages/extinct.html"),
        about: resolve(__dirname, "src/pages/about.html"),
      },
    },
  },
});