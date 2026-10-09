import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), tailwindcss()],
    server: {
      proxy:
        command === "serve" && env.API_PROXY_TARGET
          ? {
              "/api": {
                target: env.API_PROXY_TARGET,
                changeOrigin: true,
              },
            }
          : undefined,
    },
  };
});
