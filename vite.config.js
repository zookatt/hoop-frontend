import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), tailwindcss()],
    test: {
      environment: "jsdom",
      clearMocks: true,
      restoreMocks: true,
      coverage: {
        provider: "v8",
        include: [
          "src/core/auth/**/*.js",
          "src/shared/utils/**/*.js",
          "src/composables/useCreateIncident.js",
          "src/composables/useIncidents.js",
          "src/composables/useLoginFlow.js",
          "src/composables/useLoginForm.js",
        ],
        thresholds: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
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
