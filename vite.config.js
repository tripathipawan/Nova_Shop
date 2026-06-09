import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-icons": ["react-icons", "lucide-react"],
          "vendor-clerk": ["@clerk/clerk-react"],
          "vendor-misc": ["react-toastify", "lottie-react", "axios"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    assetsInlineLimit: 4096,
    target: "es2020",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
  },
  css: { devSourcemap: false },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
  },
});