import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    define: {
      "import.meta.env.BACKEND_BASE_URL": JSON.stringify(
        process.env.BACKEND_BASE_URL
      ),
    },
  };
});
