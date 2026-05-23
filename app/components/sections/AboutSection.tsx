import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui"

export function AboutSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center text-muted-foreground">
              Photo
            </div>
          </div>
          <div>
            <p className="text-primary font-medium mb-2">Qui suis-je ?</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Enseignant, Juriste et Acteur Socio-Politique
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Kamala Musavuli Gamalier est un acteur engagé de la société congolaise. 
              Son parcours atypique allie l&apos;enseignement, le droit et l&apos;engagement 
              socio-politique au service du développement de la République Démocratique du Congo.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "10+", label: "Ans d'expérience" },
                { value: "100+", label: "Articles publiés" },
                { value: "50+", label: "Événements" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link to="/a-propos">
              <Button variant="outline" className="gap-2">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
