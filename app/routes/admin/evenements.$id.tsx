import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminForm } from "@/components/admin/form"

export const Route = createFileRoute("/admin/evenements/$id")({
  component: AdminEventForm,
})

const fields = [
  { key: "title", label: "Titre", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "location", label: "Lieu", type: "text" as const },
  { key: "startDate", label: "Date de début", type: "date" as const },
  { key: "endDate", label: "Date de fin", type: "date" as const },
  { key: "status", label: "Statut", type: "select" as const, options: [{ value: "DRAFT", label: "Brouillon" }, { value: "PUBLISHED", label: "Publié" }, { value: "ARCHIVED", label: "Archivé" }] },
]

function AdminEventForm() {
  const { id } = useParams({ from: "/admin/evenements/$id" })
  const [item, setItem] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const isNew = id === "new"

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/evenements/${id}`)
        .then((r) => r.json())
        .then((data) => setItem(data.event || {}))
    }
  }, [id])

  const handleSubmit = async (data: any) => {
    setLoading(true)
    const token = localStorage.getItem("auth_token")
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/evenements" : `/api/evenements/${id}`
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    setLoading(false)
    navigate({ to: "/admin/evenements" })
  }

  return (
    <AdminForm
      title="Événement"
      item={item}
      fields={fields}
      onSubmit={handleSubmit}
      backPath="/admin/evenements"
      loading={loading}
    />
  )
}
