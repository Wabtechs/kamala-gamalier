import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { ImageOff } from "lucide-react"

export const Route = createFileRoute("/_public/galerie")({
  component: GalleryPage,
})

function GalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/galleries")
      .then((r) => r.json())
      .then((d) => setGalleries(d.galleries || []))
  }, [])

  const [expanded, setExpanded] = useState<string | null>(null)
  const [galleryMedia, setGalleryMedia] = useState<Record<string, any[]>>({})

  const handleExpand = async (galleryId: string) => {
    if (expanded === galleryId) {
      setExpanded(null)
      return
    }
    setExpanded(galleryId)
    if (!galleryMedia[galleryId]) {
      const res = await fetch(`/api/galleries/${galleryId}`)
      const data = await res.json()
      setGalleryMedia((prev) => ({ ...prev, [galleryId]: data.media || [] }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Galerie</h1>
      <p className="text-muted-foreground mb-10">Photos et médias</p>

      {galleries.length === 0 ? (
        <div className="text-center py-16">
          <ImageOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Galerie en cours de constitution.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {galleries.map((g) => (
            <div key={g.id}>
              <button onClick={() => handleExpand(g.id)} className="w-full text-left">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{g.title}</CardTitle>
                    {g.description && <p className="text-sm text-muted-foreground">{g.description}</p>}
                    <p className="text-xs text-muted-foreground">{g.mediaIds?.length || 0} photos</p>
                  </CardHeader>
                </Card>
              </button>
              {expanded === g.id && galleryMedia[g.id] && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-3">
                  {galleryMedia[g.id].map((m: any) => (
                    <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-lg overflow-hidden bg-muted block">
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </a>
                  ))}
                  {galleryMedia[g.id].length === 0 && (
                    <p className="text-xs text-muted-foreground col-span-full">Aucune photo dans cette galerie.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
