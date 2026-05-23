import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui"
import { SITE_NAME, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="hidden md:block bg-primary text-primary-foreground text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +243 000 000 000</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> contact@kamalagamalier.cd</span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors text-sm" aria-label={s.label}>
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-xl font-bold text-primary">
            {SITE_NAME}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/contact">
              <Button size="sm">Contact</Button>
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full mt-4">Contact</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
