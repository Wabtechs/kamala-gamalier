import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Link } from "@tanstack/react-router"
import { Plus, Image } from "lucide-react"

export const Route = createFileRoute("/admin/galerie")({
  component: AdminGalleries,
})

function AdminGalleries() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/galleries")
      .then((r) => r.json())
      .then((d) => { setItems(d.galleries || []); setLoading(false) })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Galeries</h1>
        <Link to={"/admin/galerie/nouvelle" as any}>
          <Button><Plus className="h-4 w-4 mr-2" />Nouvelle galerie</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">Aucune galerie.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((g: any) => (
            <Card key={g.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">{g.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">{g.description || "Aucune description"}</p>
                <p className="text-xs text-muted-foreground">{g.mediaIds?.length || 0} médias</p>
                <Link to={`/admin/galerie/${g.id}` as any}>
                  <Button variant="outline" size="sm" className="mt-2 w-full">Gérer</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
