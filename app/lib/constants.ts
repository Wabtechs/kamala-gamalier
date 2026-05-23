import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export const SITE_NAME = "Kamala Musavuli Gamalier"
export const SITE_DESCRIPTION =
  "Site officiel de Kamala Musavuli Gamalier — Enseignant, Juriste et Acteur Socio-Politique en RDC"
export const SITE_URL = process.env.SITE_URL || "http://localhost:3000"

export const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Parcours académique", href: "/parcours-academique" },
  { label: "Parcours juridique", href: "/parcours-juridique" },
  { label: "Vision politique", href: "/vision-politique" },
  { label: "Actualités", href: "/actualites" },
  { label: "Communiqués", href: "/communiques" },
  { label: "Galerie", href: "/galerie" },
  { label: "Événements", href: "/evenements" },
  { label: "Contact", href: "/contact" },
] as const

export const SOCIAL_LINKS = [
  { label: "Facebook", url: "https://facebook.com/", icon: Facebook },
  { label: "Twitter", url: "https://twitter.com/", icon: Twitter },
  { label: "Instagram", url: "https://instagram.com/", icon: Instagram },
  { label: "LinkedIn", url: "https://linkedin.com/", icon: Linkedin },
  { label: "YouTube", url: "https://youtube.com/", icon: Youtube },
] as const
