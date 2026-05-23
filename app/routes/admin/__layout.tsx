import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router"
import { AdminShell } from "@/components/admin/shell.tsx"

export const Route = createFileRoute("/admin/__layout")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        throw new Error("Non authentifié")
      }
    }
  },
  errorComponent: () => {
    const router = useRouter()
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      router.navigate({ to: "/admin/login" })
    }
    return null
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  )
}
