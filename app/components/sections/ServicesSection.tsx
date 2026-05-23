import { ArrowRight, BookOpen, Scale, Globe } from "lucide-react"
import { Button } from "@/components/ui"
import { Link } from "@tanstack/react-router"

const services = [
  {
    icon: BookOpen,
    title: "Enseignement",
    description: "Contribuer à la formation et l'éducation de la jeunesse congolaise à travers l'enseignement supérieur.",
  },
  {
    icon: Scale,
    title: "Droit & Justice",
    description: "Promouvoir l'état de droit, la justice sociale et l'accès au droit pour tous les citoyens.",
  },
  {
    icon: Globe,
    title: "Engagement citoyen",
    description: "Mobiliser la société civile pour un développement inclusif et durable de la RDC.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Mon engagement</p>
          <h2 className="text-3xl md:text-4xl font-bold">Domaines d&apos;action</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div key={svc.title} className="bg-background rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svc.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/vision-politique">
            <Button variant="outline" className="gap-2">
              Voir ma vision <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
