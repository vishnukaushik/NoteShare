import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      "import.meta.env.BACKEND_BASE_URL": JSON.stringify(env.BACKEND_BASE_URL),
    },
  };
});
