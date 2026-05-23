import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Mail, User, Calendar } from "lucide-react"
import { AdminShell } from "@/components/admin/shell.tsx"

export const Route = createFileRoute("/admin/contacts")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      throw new Error("Non authentifié")
    }
  },
  errorComponent: () => {
    const router = useRouter()
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      router.navigate({ to: "/admin/login" })
    }
    return null
  },
  component: AdminContacts,
})

function AdminContacts() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((data) => { setItems(data.contacts || []); setLoading(false) })
  }, [])

  if (loading) return <AdminShell><p className="text-muted-foreground">Chargement...</p></AdminShell>

  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-bold mb-6">Messages reçus</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Aucun message.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item: any) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-base">{item.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString("fr")}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {item.email}
                  </div>
                  {item.subject && <p className="text-sm font-medium mt-1">{item.subject}</p>}
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{item.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
