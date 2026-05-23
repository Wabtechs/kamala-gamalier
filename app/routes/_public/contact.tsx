import { createFileRoute } from "@tanstack/react-router"
import { ContactSection } from "@/components/sections/ContactSection"

export const Route = createFileRoute("/_public/contact")({
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="pt-8">
      <ContactSection />
    </div>
  )
}
