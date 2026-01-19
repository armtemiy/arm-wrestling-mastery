import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path - корень для кастомного домена
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Оптимизация сборки
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    // Разделение кода для лучшего кеширования
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
    // Увеличиваем лимит для предупреждений о размере
    chunkSizeWarningLimit: 1000,
    // Оптимизация ассетов
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: mode === 'development',
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));

