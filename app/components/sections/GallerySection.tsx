import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui"

const images = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Photo ${i + 1}`,
}))

export function GallerySection() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Moments forts</p>
          <h2 className="text-3xl md:text-4xl font-bold">Galerie photo</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="aspect-square bg-muted rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {img.title}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/galerie">
            <Button variant="outline" className="gap-2">
              Voir toute la galerie <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
