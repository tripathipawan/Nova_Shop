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
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["react-icons", "lucide-react"],
          "vendor-clerk": ["@clerk/clerk-react"],
          "vendor-misc": ["react-toastify", "lottie-react", "axios"],
        },
        // Consistent chunk filenames for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Smaller inline threshold → fewer render-blocking resources
    assetsInlineLimit: 4096,
    // Target modern browsers → smaller bundles
    target: "es2020",
    // Enable source map for production debugging (optional — remove if not needed)
    sourcemap: false,
    // Minify with esbuild (default, faster than terser)
    minify: "esbuild",
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 600,
    // CSS code-splitting
    cssCodeSplit: true,
  },

  // CSS code-splitting
  css: { devSourcemap: false },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
  },
});