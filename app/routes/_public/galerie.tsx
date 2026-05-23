import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/galerie")({
  component: GalleryPage,
})

function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Galerie</h1>
      <div className="prose max-w-3xl">
        <p className="text-muted-foreground">Page en construction. Contenu à venir.</p>
      </div>
    </div>
  )
}
