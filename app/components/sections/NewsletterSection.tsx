import { useState } from "react"
import { Button } from "@/components/ui"
import { Send } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) {
        toast.error("Cet email est déjà inscrit")
        return
      }
      if (!res.ok) throw new Error()
      toast.success("Inscription réussie")
      setEmail("")
    } catch {
      toast.error("Erreur lors de l'inscription")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Newsletter</h2>
          <p className="opacity-80 mb-6">
            Restez informé des dernières actualités et événements.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 h-10 px-4 rounded-md text-foreground bg-primary-foreground/10 border border-primary-foreground/20 placeholder:text-primary-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/30"
            />
            <Button type="submit" variant="secondary" className="gap-2" disabled={sending}>
              <Send className="h-4 w-4" /> {sending ? "..." : "S'abonner"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
