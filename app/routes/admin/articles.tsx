import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminList } from "@/components/admin/list"
import { AdminShell } from "@/components/admin/shell.tsx"

export const Route = createFileRoute("/admin/articles")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      throw new Error("Non authentifié")
    }
  },
  errorComponent: () => {
    const router = useRouter()
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      router.navigate({ to: "/admin/login" })
    }
    return null
  },
  component: AdminArticlesList,
})

function AdminArticlesList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetch("/api/articles")
    const data = await res.json()
    setItems(data.articles || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("auth_token")
    await fetch(`/api/articles/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  return (
    <AdminShell>
      <AdminList
        title="Articles"
        items={items}
        columns={[
          { key: "title", label: "Titre" },
          { key: "status", label: "Statut" },
          { key: "createdAt", label: "Créé le", render: (v: string) => v ? new Date(v).toLocaleDateString("fr") : "-" },
        ]}
        basePath="/admin/articles"
        loading={loading}
        onDelete={handleDelete}
      />
    </AdminShell>
  )
}
