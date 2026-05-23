import * as crypto from "node:crypto"
import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.resolve(__dirname, "../data/db.json")
const dir = path.dirname(DB_PATH)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const SALT = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, 1000, 64, "sha512").toString("hex")
}

const db = {
  articles: [
    {
      id: crypto.randomUUID(),
      title: "Bienvenue sur mon site officiel",
      slug: "bienvenue",
      excerpt: "Un message de bienvenue et de presentation de ma vision pour la RDC.",
      content: "Chers compatriotes, chers visiteurs,\n\nC'est avec une grande joie que je vous accueille sur mon site officiel. Ce site a pour vocation de vous informer sur mon parcours, mes engagements et ma vision pour notre cher pays, la Republique Democratique du Congo.\n\nA travers ces pages, vous decouvrirez mon cheminement academique, mon parcours juridique et mon implication socio-politique. Je souhaite que ce lieu d'echange et de partage puisse contribuer au debat d'idees et a la construction d'un Congo meilleur.\n\nN'hesitez pas a me contacter pour toute question ou suggestion.\n\nBien cordialement,\nKamala Musavuli Gamalier",
      status: "PUBLISHED",
      featuredImage: null,
      authorId: "1",
      publishedAt: "2026-01-15T08:00:00.000Z",
      createdAt: "2026-01-15T08:00:00.000Z",
      updatedAt: "2026-01-15T08:00:00.000Z",
    },
  ],
  communiques: [],
  events: [
    {
      id: crypto.randomUUID(),
      title: "Conference de presse",
      slug: "conference-presse-2026",
      description: "Conference de presse sur la situation socio-politique en RDC",
      content: null,
      startDate: "2026-06-15T10:00:00.000Z",
      endDate: "2026-06-15T12:00:00.000Z",
      location: "Kinshasa",
      address: "Hotel Pullman, Kinshasa",
      imageUrl: null,
      status: "PUBLISHED",
      authorId: "1",
      createdAt: "2026-01-20T08:00:00.000Z",
      updatedAt: "2026-01-20T08:00:00.000Z",
    },
  ],
  contacts: [],
  newsletter: [],
  categories: [
    { id: crypto.randomUUID(), name: "Politique", slug: "politique", createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { id: crypto.randomUUID(), name: "Juridique", slug: "juridique", createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { id: crypto.randomUUID(), name: "Academique", slug: "academique", createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  ],
  users: [
    {
      id: "1",
      email: "admin@kamalagamalier.cd",
      password: hashPassword("admin123"),
      name: "Administrateur",
      role: "SUPER_ADMIN",
    },
  ],
  settings: {},
}

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
console.log("Database seeded successfully")
