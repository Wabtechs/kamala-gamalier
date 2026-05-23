import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminForm } from "@/components/admin/form"

export const Route = createFileRoute("/admin/articles/$id")({
  component: AdminArticleForm,
})

const fields = [
  { key: "title", label: "Titre", type: "text" as const },
  { key: "content", label: "Contenu", type: "textarea" as const },
  { key: "excerpt", label: "Extrait", type: "textarea" as const },
  { key: "status", label: "Statut", type: "select" as const, options: [{ value: "DRAFT", label: "Brouillon" }, { value: "PUBLISHED", label: "Publié" }, { value: "ARCHIVED", label: "Archivé" }] },
]

function AdminArticleForm() {
  const { id } = useParams({ from: "/admin/articles/$id" })
  const [item, setItem] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const isNew = id === "new"

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/articles/${id}`)
        .then((r) => r.json())
        .then((data) => setItem(data.article || {}))
    }
  }, [id])

  const handleSubmit = async (data: any) => {
    setLoading(true)
    const token = localStorage.getItem("auth_token")
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/articles" : `/api/articles/${id}`
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    setLoading(false)
    navigate({ to: "/admin/articles" })
  }

  return (
    <AdminForm
      title="Article"
      item={item}
      fields={fields}
      onSubmit={handleSubmit}
      backPath="/admin/articles"
      loading={loading}
    />
  )
}
