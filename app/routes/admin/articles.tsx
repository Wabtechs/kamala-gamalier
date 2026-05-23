import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminList } from "@/components/admin/list"

export const Route = createFileRoute("/admin/articles")({
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
    const token = localStorage.getItem("token")
    await fetch(`/api/articles/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  return (
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
  )
}
