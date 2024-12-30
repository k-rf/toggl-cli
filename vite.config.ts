import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import vitePluginCleanupAssets from "./plugin/vite-plugin-cleanup-assets";
import vitePluginCopy from "./plugin/vite-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "app") {
    return {
      root: "src",
      plugins: [
        tsconfigPaths(),
        vitePluginCleanupAssets(),
        vitePluginCopy({ from: "src/manifest.json", to: "dist/manifest.json" }),
      ],
      build: {
        outDir: "../dist",
        emptyOutDir: false,
      },
    };
  }

  return {
    plugins: [tsconfigPaths()],
    build: {
      emptyOutDir: false,
      rollupOptions: {
        input: ["src/worker/background.ts", "src/worker/content-script.ts"],
        output: {
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
