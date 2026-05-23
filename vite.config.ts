import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import path from "path"
import { fileURLToPath } from "url"
import { handleRequest } from "./app/server/api.ts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: path.resolve(__dirname, "app/routes"),
      generatedRouteTree: path.resolve(__dirname, "app/routeTree.gen.ts"),
    }),
    {
      name: "api-handler",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith("/api/")) {
            return next()
          }

          const protocol = req.headers["x-forwarded-proto"] || "http"
          const host = req.headers.host || "localhost"
          const url = new URL(req.url, `${protocol}://${host}`)

          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) {
            if (v) headers.set(k, Array.isArray(v) ? v.join(", ") : v)
          }

          const body = req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
            ? await new Promise<Buffer>((resolve) => {
                const chunks: Buffer[] = []
                req.on("data", (c: Buffer) => chunks.push(c))
                req.on("end", () => resolve(Buffer.concat(chunks)))
              })
            : undefined

          const fetchReq = new Request(url.toString(), {
            method: req.method,
            headers,
            body,
          })

          try {
            const response = await handleRequest(fetchReq, req.method || "GET", url.pathname)
            res.statusCode = response.status
            response.headers.forEach((v, k) => res.setHeader(k, v))
            const text = await response.text()
            res.end(text)
          } catch (error: any) {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: error.message }))
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  server: {
    port: 3000,
  },
})
