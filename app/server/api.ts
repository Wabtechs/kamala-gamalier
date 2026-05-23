import { createToken, verifyToken, verifyPassword, ADMIN_CREDENTIALS } from "../lib/auth.ts"
import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.resolve(__dirname, "../../data/db.json")

interface Store {
  articles: any[]
  communiques: any[]
  events: any[]
  contacts: any[]
  newsletter: any[]
  categories: any[]
  users: any[]
  media: any[]
  galleries: any[]
  settings: Record<string, string>
}

function getDefaults(): Store {
  return {
    articles: [],
    communiques: [],
    events: [],
    contacts: [],
    newsletter: [],
    categories: [],
    users: [ADMIN_CREDENTIALS],
    media: [],
    galleries: [],
    settings: {},
  }
}

function loadDb(): Store {
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8")
    const parsed = JSON.parse(data)
    const defaults = getDefaults()
    for (const key of Object.keys(defaults)) {
      if (!(key in parsed)) (parsed as any)[key] = (defaults as any)[key]
    }
    return parsed
  } catch {
    const initial: Store = getDefaults()
    saveDb(initial)
    return initial
  }
}

function saveDb(db: Store): void {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

function getSingleId(pathname: string): string | null {
  const parts = pathname.split("/")
  return parts.length >= 4 ? parts[parts.length - 1] : null
}

function requireAuth(getAuthUser: () => Promise<any>): Promise<Response | any> {
  return getAuthUser().then((user) => {
    if (!user) return { unauthorized: true }
    return user
  })
}

export async function handleRequest(req: Request, method: string, pathname: string): Promise<Response> {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  const db = loadDb()

  let body: any = null
  if (method === "POST" || method === "PUT" || method === "PATCH") {
    try { body = await req.json() } catch { body = {} }
  }

  const getAuthUser = async () => {
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) return null
    return verifyToken(authHeader.slice(7))
  }

  const json = (data: any, status = 200) => new Response(JSON.stringify(data), { status, headers })

  try {
    // Auth
    if (pathname === "/api/auth/login" && method === "POST") {
      const { email, password } = body
      const user = db.users.find((u: any) => u.email === email)
      if (!user || !verifyPassword(password, user.password))
        return json({ error: "Email ou mot de passe incorrect" }, 401)
      const token = await createToken({ id: user.id, email: user.email, name: user.name, role: user.role })
      return json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    }

    if (pathname === "/api/auth/me" && method === "GET") {
      const user = await getAuthUser()
      if (!user) return json({ error: "Non autorisé" }, 401)
      return json({ user })
    }

    // Stats
    if (pathname === "/api/stats" && method === "GET") {
      return json({
        articles: db.articles.length,
        communiques: db.communiques.length,
        events: db.events.length,
        contacts: db.contacts.length,
        newsletter: db.newsletter.length,
      })
    }

    // Helper: CRUD handlers
    const crudHandlers = (collection: string, itemName: string, singular: string) => {
      const list = (db as any)[collection] as any[]

      // GET list
      if (pathname === `/api/${collection}` && method === "GET") {
        const url = new URL(req.url)
        const status = url.searchParams.get("status")
        const items = status ? list.filter((a: any) => a.status === status) : list
        return json({ [itemName]: items })
      }

      // GET single
      const id = getSingleId(pathname)
      if (id && pathname.startsWith(`/api/${collection}/`) && method === "GET" && pathname.split("/").length === 4) {
        const item = list.find((a: any) => a.id === id)
        if (!item) return json({ error: `${singular} non trouvé` }, 404)
        return json({ [singular]: item })
      }

      // POST create
      if (pathname === `/api/${collection}` && method === "POST") {
        return getAuthUser().then((user) => {
          if (!user) return json({ error: "Non autorisé" }, 401)
          const item = {
            id: crypto.randomUUID(),
            ...body,
            authorId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          list.push(item)
          saveDb(db)
          return json({ [singular]: item }, 201)
        })
      }

      // PUT update
      if (id && pathname.startsWith(`/api/${collection}/`) && method === "PUT" && pathname.split("/").length === 4) {
        return getAuthUser().then((user) => {
          if (!user) return json({ error: "Non autorisé" }, 401)
          const idx = list.findIndex((a: any) => a.id === id)
          if (idx === -1) return json({ error: `${singular} non trouvé` }, 404)
          list[idx] = { ...list[idx], ...body, id: list[idx].id, updatedAt: new Date().toISOString() }
          saveDb(db)
          return json({ [singular]: list[idx] })
        })
      }

      // DELETE
      if (id && pathname.startsWith(`/api/${collection}/`) && method === "DELETE" && pathname.split("/").length === 4) {
        return getAuthUser().then((user) => {
          if (!user) return json({ error: "Non autorisé" }, 401)
          const idx = list.findIndex((a: any) => a.id === id)
          if (idx === -1) return json({ error: `${singular} non trouvé` }, 404)
          list.splice(idx, 1)
          saveDb(db)
          return json({ success: true })
        })
      }

      return null
    }

    const articleResult = crudHandlers("articles", "articles", "article")
    if (articleResult) return articleResult

    const communiqueResult = crudHandlers("communiques", "communiques", "communique")
    if (communiqueResult) return communiqueResult

    const eventResult = crudHandlers("evenements", "events", "event")
    if (eventResult) return eventResult

    // Contact
    if (pathname === "/api/contact" && method === "POST") {
      const contact = { id: crypto.randomUUID(), ...body, read: false, createdAt: new Date().toISOString() }
      db.contacts.push(contact)
      saveDb(db)
      return json({ success: true }, 201)
    }

    // GET contacts (admin)
    if (pathname === "/api/contacts" && method === "GET") {
      return json({ contacts: db.contacts })
    }

    // Newsletter
    if (pathname === "/api/newsletter" && method === "POST") {
      const { email } = body
      if (!email) return json({ error: "Email requis" }, 400)
      if (db.newsletter.find((n: any) => n.email === email))
        return json({ error: "Déjà inscrit" }, 409)
      db.newsletter.push({ id: crypto.randomUUID(), email, active: true, createdAt: new Date().toISOString() })
      saveDb(db)
      return json({ success: true }, 201)
    }

    // File upload (base64 JSON)
    if (pathname === "/api/upload" && method === "POST") {
      const user = await getAuthUser()
      if (!user) return json({ error: "Non autorisé" }, 401)
      const { file, name } = body
      if (!file || !name) return json({ error: "Fichier requis" }, 400)
      const matches = file.match(/^data:(.+);base64,(.+)$/)
      if (!matches) return json({ error: "Format base64 invalide" }, 400)
      const ext = path.extname(name) || ".bin"
      const filename = `${path.basename(name, ext).replace(/[^a-zA-Z0-9-]/g, "_")}-${Date.now()}${ext}`
      const uploadDir = path.resolve(__dirname, "../../public/uploads")
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
      fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(matches[2], "base64"))
      const mediaItem = {
        id: crypto.randomUUID(),
        url: `/uploads/${filename}`,
        name: name,
        filename,
        mime: matches[1],
        size: Buffer.from(matches[2], "base64").length,
        authorId: user.id,
        createdAt: new Date().toISOString(),
      }
      db.media.push(mediaItem)
      saveDb(db)
      return json({ url: `/uploads/${filename}`, name: filename, media: mediaItem })
    }

    // GET /api/media - list all media
    if (pathname === "/api/media" && method === "GET") {
      return json({ media: db.media })
    }

    // DELETE /api/media/:id
    const mediaId = pathname.match(/^\/api\/media\/(.+)$/)?.[1]
    if (mediaId && method === "DELETE") {
      const user = await getAuthUser()
      if (!user) return json({ error: "Non autorisé" }, 401)
      const idx = db.media.findIndex((m: any) => m.id === mediaId)
      if (idx === -1) return json({ error: "Fichier non trouvé" }, 404)
      const filePath = path.resolve(__dirname, "../../public", db.media[idx].url.replace(/^\//, ""))
      try { fs.unlinkSync(filePath) } catch {}
      db.media.splice(idx, 1)
      saveDb(db)
      return json({ success: true })
    }

    // Galleries CRUD
    if (pathname === "/api/galleries" && method === "GET") {
      return json({ galleries: db.galleries })
    }

    if (pathname === "/api/galleries" && method === "POST") {
      const user = await getAuthUser()
      if (!user) return json({ error: "Non autorisé" }, 401)
      const { title, description, mediaIds } = body
      if (!title) return json({ error: "Titre requis" }, 400)
      const gallery = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        mediaIds: mediaIds || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      db.galleries.push(gallery)
      saveDb(db)
      return json({ gallery }, 201)
    }

    // Gallery detail with resolved media
    const galleryMatch = pathname.match(/^\/api\/galleries\/(.+)$/)
    if (galleryMatch && method === "GET") {
      const gallery = db.galleries.find((g: any) => g.id === galleryMatch[1])
      if (!gallery) return json({ error: "Galerie non trouvée" }, 404)
      const media = db.media.filter((m: any) => gallery.mediaIds.includes(m.id))
      return json({ gallery, media })
    }

    return json({ error: "Route non trouvée" }, 404)
  } catch (error: any) {
    return json({ error: error.message }, 500)
  }
}
