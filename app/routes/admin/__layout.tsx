import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { LayoutDashboard, FileText, Newspaper, Calendar, Image, HardDrive, File, User, Settings, LogOut, Menu, X, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui"
import { SITE_NAME } from "@/lib/constants"

const sidebarLinks = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Communiqués", href: "/admin/communiques", icon: Newspaper },
  { label: "Événements", href: "/admin/evenements", icon: Calendar },
  { label: "Messages", href: "/admin/contacts", icon: MessageSquare },
  { label: "Galerie", href: "/admin/galerie", icon: Image },
  { label: "Médias", href: "/admin/medias", icon: HardDrive },
  { label: "Pages", href: "/admin/pages", icon: File },
  { label: "Parcours", href: "/admin/profils", icon: User },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
]

export const Route = createFileRoute("/admin/__layout")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        throw new Error("Non authentifié")
      }
    }
  },
  errorComponent: () => {
    const router = useRouter()
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      router.navigate({ to: "/admin/login" })
    }
    return null
  },
  component: AdminLayout,
})

function AdminLayout() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    router.navigate({ to: "/admin/login" })
  }

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth_user") || "null")
    : null

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className={`fixed top-0 left-0 z-40 h-full w-64 bg-background border-r transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-4 border-b">
          <Link to="/admin" className="text-lg font-bold text-primary">{SITE_NAME}</Link>
          <p className="text-xs text-muted-foreground mt-1">Administration</p>
        </div>

        <nav className="p-2 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              activeProps={{ className: "bg-muted font-medium text-primary" }}
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {user && (
            <div className="text-sm mb-2">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          )}
          <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-background border-b h-14 flex items-center px-4 gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex-1" />
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">Voir le site</Link>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
