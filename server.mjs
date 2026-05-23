import { createServer } from "vite"

const server = await createServer({
  configFile: "./vite.config.ts",
  configLoader: "native",
  server: { port: parseInt(process.env.PORT || "3000") },
})

await server.listen()
console.log(`Production server running at http://localhost:${server.config.server.port}`)
