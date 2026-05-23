import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import { Calendar, FileText } from "lucide-react"

export const Route = createFileRoute("/_public/communiques")({
  component: PressPage,
})

function PressPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/communiques")
      .then((r) => r.json())
      .then((d) => setItems(d.communiques || []))
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Communiqués</h1>
      <p className="text-muted-foreground mb-10">Communiqués de presse et déclarations officielles</p>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Aucun communiqué pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString("fr")}
                </div>
              </CardHeader>
              {item.content && (
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">{item.content}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
