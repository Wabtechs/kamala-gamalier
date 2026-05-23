import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminList } from "@/components/admin/list"

export const Route = createFileRoute("/admin/evenements")({
  component: AdminEventsList,
})

function AdminEventsList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetch("/api/evenements")
    const data = await res.json()
    setItems(data.events || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    await fetch(`/api/evenements/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  return (
    <AdminList
      title="Événements"
      items={items}
      columns={[
        { key: "title", label: "Titre" },
        { key: "location", label: "Lieu" },
        { key: "startDate", label: "Date", render: (v: string) => v ? new Date(v).toLocaleDateString("fr") : "-" },
        { key: "status", label: "Statut" },
      ]}
      basePath="/admin/evenements"
      loading={loading}
      onDelete={handleDelete}
    />
  )
}
