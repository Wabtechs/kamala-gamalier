import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Book, Award, Calendar } from "lucide-react"

export const Route = createFileRoute("/_public/parcours-academique")({
  component: AcademicPage,
})

const entries = [
  { period: "2015 - 2019", title: "Doctorat en Droit Public", institution: "Université de Kinshasa", desc: "Thèse sur la gouvernance démocratique et l'État de droit en RDC" },
  { period: "2011 - 2013", title: "Master en Droit Public", institution: "Université de Kinshasa", desc: "Mémoire sur les droits fondamentaux et la justice constitutionnelle" },
  { period: "2007 - 2011", title: "Licence en Droit", institution: "Université de Kinshasa", desc: "Formation générale en droit avec spécialisation en droit public" },
  { period: "2001 - 2007", title: "Diplôme d'État", institution: "Collège Boboto, Kinshasa", desc: "Section littéraire, option Latin-Philosophie" },
  { period: "2020", title: "Certificat en Droits Humains", institution: "Institut des Droits de l'Homme et de la Paix", desc: "Formation spécialisée sur les mécanismes de protection des droits humains" },
  { period: "2022", title: "Certificat en Leadership Politique", institution: "Centre d'Études Politiques", desc: "Programme de formation sur le leadership et la gouvernance" },
]

function AcademicPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Parcours académique</h1>
      <p className="text-muted-foreground mb-10">Formation et diplômes</p>

      <div className="relative space-y-0">
        {entries.map((entry, i) => (
          <div key={i} className="relative pl-8 pb-8 last:pb-0">
            <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary" />
            {i < entries.length - 1 && <div className="absolute left-[5px] top-4 w-0.5 h-full bg-border" />}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base">{entry.title}</CardTitle>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <Calendar className="h-3 w-3" />{entry.period}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Award className="h-3 w-3" />
                  {entry.institution}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{entry.desc}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
