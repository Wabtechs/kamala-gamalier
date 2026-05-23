import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import { Calendar, MapPin } from "lucide-react"

export const Route = createFileRoute("/_public/evenements")({
  component: EventsPage,
})

function EventsPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/evenements")
      .then((r) => r.json())
      .then((d) => setItems(d.events || []))
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Événements</h1>
      <p className="text-muted-foreground mb-10">Prochains événements et activités</p>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Aucun événement à venir.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Badge className="w-fit mb-2">{item.status}</Badge>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.startDate).toLocaleDateString("fr")}
                    {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString("fr")}`}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                  )}
                  {item.description && <p className="mt-2">{item.description}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
