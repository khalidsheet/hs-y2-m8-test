import { defineConfig } from "vite";
import cssnano from "cssnano";
import imagemin from "vite-plugin-imagemin";
import VitePluginWebpCompress from "vite-plugin-webp-compress";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  sourcemap: true,
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        menu: resolve(__dirname, "menu.html"),
        news: resolve(__dirname, "news.html"),
        "news-detail": resolve(__dirname, "news-detail.html"),
      },
    },
  },
  plugins: [cssnano(), imagemin(), VitePluginWebpCompress()],
});
