import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui"
import { Link } from "@tanstack/react-router"
import { formatDate } from "@/lib/utils"

const events = [
  {
    title: "Conférence sur la justice sociale en RDC",
    date: new Date("2026-06-15"),
    location: "Kinshasa, RDC",
    image: "",
  },
  {
    title: "Séminaire sur l'éducation citoyenne",
    date: new Date("2026-07-20"),
    location: "Lubumbashi, RDC",
    image: "",
  },
  {
    title: "Forum sur le développement durable",
    date: new Date("2026-08-10"),
    location: "Bukavu, RDC",
    image: "",
  },
]

export function EventsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Agenda</p>
          <h2 className="text-3xl md:text-4xl font-bold">Événements à venir</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[16/9] bg-muted flex items-center justify-center text-muted-foreground">
                Image
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-2">{formatDate(event.date)}</Badge>
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/evenements">
            <span className="text-primary font-medium hover:underline cursor-pointer">Voir tous les événements →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
