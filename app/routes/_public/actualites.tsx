import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import { Calendar, ChevronRight } from "lucide-react"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/actualites")({
  component: NewsPage,
})

function NewsPage() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/articles?status=PUBLISHED")
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Actualités</h1>
      <p className="text-muted-foreground mb-10">Les dernières nouvelles et publications</p>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Aucune actualité pour le moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(a.createdAt).toLocaleDateString("fr")}
                  <Badge variant="outline" className="text-xs">{a.status}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {a.excerpt && <p className="text-sm text-muted-foreground mb-3">{a.excerpt}</p>}
                <span className="text-sm text-primary flex items-center gap-1">
                  Lire plus <ChevronRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
