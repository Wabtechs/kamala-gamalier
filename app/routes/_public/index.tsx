import { createFileRoute } from "@tanstack/react-router"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { EventsSection } from "@/components/sections/EventsSection"
import { GallerySection } from "@/components/sections/GallerySection"
import { NewsletterSection } from "@/components/sections/NewsletterSection"
import { ContactSection } from "@/components/sections/ContactSection"

export const Route = createFileRoute("/_public/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <GallerySection />
      <NewsletterSection />
      <ContactSection />
    </>
  )
}
