import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Target, Lightbulb, HandHeart, Globe } from "lucide-react"

export const Route = createFileRoute("/_public/vision-politique")({
  component: VisionPage,
})

const pillars = [
  {
    icon: Target,
    title: "État de droit et démocratie",
    desc: "Consolidation des institutions démocratiques, indépendance de la justice, respect des libertés fondamentales et promotion de la bonne gouvernance.",
  },
  {
    icon: Lightbulb,
    title: "Éducation et formation",
    desc: "Investissement massif dans l'éducation nationale, modernisation du système universitaire et promotion de la recherche scientifique comme moteur de développement.",
  },
  {
    icon: HandHeart,
    title: "Justice sociale",
    desc: "Lutte contre les inégalités, protection des plus vulnérables, accès équitable aux services de base et promotion d'une économie inclusive.",
  },
  {
    icon: Globe,
    title: "Développement durable",
    desc: "Exploitation responsable des ressources naturelles, protection de l'environnement et développement d'une économie verte créatrice d'emplois.",
  },
]

function VisionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Vision politique</h1>
      <p className="text-muted-foreground mb-6">Pour une RDC forte, prospère et démocratique</p>

      <div className="prose max-w-3xl mb-12">
        <p className="text-muted-foreground leading-relaxed">
          Ma vision pour la République Démocratique du Congo est celle d'un pays où règnent
          l'État de droit, la justice sociale et le développement durable. Je crois en une RDC
          où chaque citoyen peut réaliser son potentiel, où les institutions sont fortes et
          respectées, et où les ressources nationales profitent à tous.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Mon engagement politique s'inscrit dans une démarche de construction nationale,
          de réconciliation et de progrès. Je milite pour un Congo uni dans sa diversité,
          prospère grâce à ses talents et respecté sur la scène internationale.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-6">Les piliers de ma vision</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {pillars.map((p) => (
          <Card key={p.title}>
            <CardHeader className="pb-2">
              <p.icon className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
