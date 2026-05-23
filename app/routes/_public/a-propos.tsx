import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { GraduationCap, Scale, Users, BookOpen } from "lucide-react"

export const Route = createFileRoute("/_public/a-propos")({
  component: AboutPage,
})

const highlights = [
  { icon: GraduationCap, title: "Enseignant", desc: "Professeur d'université engagé dans la formation de la jeunesse congolaise" },
  { icon: Scale, title: "Juriste", desc: "Expert en droit public et défenseur des droits humains" },
  { icon: Users, title: "Acteur Socio-Politique", desc: "Acteur engagé pour le développement et la démocratie en RDC" },
  { icon: BookOpen, title: "Auteur", desc: "Auteur de plusieurs publications sur le droit et la politique" },
]

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">À propos</h1>
      <p className="text-muted-foreground mb-10">Qui est Kamala Musavuli Gamalier ?</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Biographie</h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Kamala Musavuli Gamalier est un enseignant, juriste et acteur socio-politique
              congolais, né à Kinshasa en République Démocratique du Congo. Il consacre sa vie
              à l'éducation, à la justice et à l'engagement civique.
            </p>
            <p>
              Titulaire d'un doctorat en droit public, il enseigne dans plusieurs universités
              de la place et participe activement aux débats sur l'avenir de la RDC.
              Son parcours est marqué par un engagement constant pour les valeurs de
              démocratie, d'État de droit et de justice sociale.
            </p>
            <p>
              À travers ses enseignements, ses écrits et ses actions sur le terrain,
              Kamala Musavuli Gamalier œuvre pour une société congolaise plus juste,
              plus éduquée et plus prospère.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((h) => (
            <Card key={h.title}>
              <CardHeader className="pb-2">
                <h.icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-sm">{h.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{h.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
