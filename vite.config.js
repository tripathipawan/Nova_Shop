import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Chunk splitting — reduces unused JS per page
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy UI libs in their own chunk
          "vendor-react":   ["react", "react-dom", "react-router-dom"],
          "vendor-motion":  ["framer-motion"],
          "vendor-icons":   ["react-icons", "lucide-react"],
          "vendor-clerk":   ["@clerk/clerk-react"],
          "vendor-misc":    ["react-toastify", "lottie-react", "axios"],
        },
      },
    },
    // Smaller inline threshold → fewer render-blocking resources
    assetsInlineLimit: 4096,
    // Target modern browsers → smaller bundles
    target: "es2020",
  },

  // CSS code-splitting
  css: { devSourcemap: false },
});