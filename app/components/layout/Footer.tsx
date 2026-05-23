import { Link } from "@tanstack/react-router"
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"

const footerLinks = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  { label: "Communiqués", href: "/communiques" },
  { label: "Événements", href: "/evenements" },
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-muted text-sm leading-relaxed opacity-80">
              Enseignant, Juriste et Acteur Socio-Politique en République Démocratique du Congo.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label={s.label}>
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="text-sm opacity-80 space-y-2">
              <p>Kinshasa, RDC</p>
              <p>+243 000 000 000</p>
              <p>contact@kamalagamalier.cd</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
