// @ts-check
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  server: {
    port: 3000,
  },
}

export default config
