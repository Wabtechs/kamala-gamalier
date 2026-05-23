import { createServer } from "vite"

const server = await createServer({
  configFile: "./vite.config.ts",
  configLoader: "native",
  server: { port: 3220, host: "127.0.0.1" },
})
await server.listen()

const r = await fetch("http://localhost:3220/")
const t = await r.text()
console.log("Status:", r.status, "Has root:", t.includes('id="root"'))

const loginRes = await fetch("http://localhost:3220/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@kamalagamalier.cd", password: "admin123" }),
})
const loginData = await loginRes.json()
console.log("Login:", loginRes.status, !!loginData.token)

await server.close()
console.log("OK")
