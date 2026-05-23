import { useState } from "react"
import { Button, Input, Textarea } from "@/components/ui"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { toast } from "sonner"

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast.success("Message envoyé avec succès")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Erreur lors de l'envoi")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Restons en contact</p>
          <h2 className="text-3xl md:text-4xl font-bold">Contactez-nous</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MapPin, title: "Adresse", detail: "Kinshasa, RDC" },
            { icon: Phone, title: "Téléphone", detail: "+243 000 000 000" },
            { icon: Mail, title: "Email", detail: "contact@kamalagamalier.cd" },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 border rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input type="email" placeholder="Votre email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <Input placeholder="Sujet" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <Textarea placeholder="Votre message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <Button type="submit" className="w-full gap-2" disabled={sending}>
              <Send className="h-4 w-4" /> {sending ? "Envoi..." : "Envoyer le message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
