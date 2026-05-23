import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { FileText, Newspaper, Calendar, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Link } from "@tanstack/react-router"

const statsCards = [
  { label: "Articles", href: "/admin/articles", icon: FileText, key: "articles" },
  { label: "Communiqués", href: "/admin/communiques", icon: Newspaper, key: "communiques" },
  { label: "Événements", href: "/admin/evenements", icon: Calendar, key: "events" },
  { label: "Messages", href: "/admin/contacts", icon: MessageSquare, key: "messages" },
]

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
})

function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats")
        const data = await res.json()
        setStats({
          articles: data.articles || 0,
          communiques: data.communiques || 0,
          events: data.events || 0,
          messages: data.contacts || 0,
        })
      } catch {
        setStats({ articles: 0, communiques: 0, events: 0, messages: 0 })
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card) => (
          <Link key={card.key} to={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{loading ? "..." : stats[card.key]}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Aucune activité récente.</p>
        </CardContent>
      </Card>
    </div>
  )
}
