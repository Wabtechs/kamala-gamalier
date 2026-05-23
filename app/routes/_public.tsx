import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
