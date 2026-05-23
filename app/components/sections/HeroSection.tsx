import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui"
import { Link } from "@tanstack/react-router"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/90 to-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-medium mb-2 opacity-90">Ensemble, construisons l&apos;avenir</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Kamala Musavuli Gamalier
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl">
            Enseignant, Juriste et Acteur Socio-Politique — engagé pour le développement de la RDC
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/a-propos">
              <Button size="lg" variant="secondary" className="gap-2">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
