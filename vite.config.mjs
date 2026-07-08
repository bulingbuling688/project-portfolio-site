import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
  plugins: [react()],
});
