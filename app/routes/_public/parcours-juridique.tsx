import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Scale, Gavel, FileText, Handshake } from "lucide-react"

export const Route = createFileRoute("/_public/parcours-juridique")({
  component: LegalPage,
})

const sections = [
  {
    icon: Scale,
    title: "Avocat au Barreau de Kinshasa",
    items: [
      "Plaidoyer dans des dossiers de droit constitutionnel",
      "Représentation de clients dans des affaires de droits humains",
      "Consultations juridiques pour des organisations de la société civile",
    ],
  },
  {
    icon: Gavel,
    title: "Consultant Juridique",
    items: [
      "Conseil auprès d'organisations internationales",
      "Expertise en droit public et administratif",
      "Rédaction d'avis juridiques sur des réformes législatives",
    ],
  },
  {
    icon: FileText,
    title: "Publications",
    items: [
      "Auteur de plusieurs articles sur le droit constitutionnel congolais",
      "Contributions à des revues juridiques internationales",
      "Études sur les mécanismes de protection des droits fondamentaux",
    ],
  },
  {
    icon: Handshake,
    title: "Engagements",
    items: [
      "Membre de l'Union des Avocats Congolais",
      "Collaborateur d'ONG de défense des droits humains",
      "Participant aux forums régionaux sur la justice et l'État de droit",
    ],
  },
]

function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Parcours juridique</h1>
      <p className="text-muted-foreground mb-10">Carrière et engagements dans le domaine juridique</p>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Card key={s.title}>
            <CardHeader className="pb-3">
              <s.icon className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-base">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {s.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
