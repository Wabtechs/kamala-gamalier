import { SignJWT, jwtVerify } from "jose"
import * as crypto from "node:crypto"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-key-change-in-production")
const SALT = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

export type AuthPayload = {
  id: string
  email: string
  name: string
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "MODERATOR"
}

export async function createToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AuthPayload
  } catch {
    return null
  }
}

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, 1000, 64, "sha512").toString("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export const ADMIN_CREDENTIALS = {
  id: "1",
  email: "admin@kamalagamalier.cd",
  password: hashPassword("admin123"),
  name: "Administrateur",
  role: "SUPER_ADMIN" as const,
}
