import { createFileRoute, useNavigate, useParams, useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { AdminForm } from "@/components/admin/form"
import { AdminShell } from "@/components/admin/shell.tsx"

export const Route = createFileRoute("/admin/communiques/$id")({
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
  component: AdminCommuniqueForm,
})

const fields = [
  { key: "title", label: "Titre", type: "text" as const },
  { key: "content", label: "Contenu", type: "textarea" as const },
  { key: "type", label: "Type", type: "select" as const, options: [{ value: "PRESS", label: "Communiqué de presse" }, { value: "STATEMENT", label: "Déclaration" }, { value: "REPORT", label: "Rapport" }] },
  { key: "status", label: "Statut", type: "select" as const, options: [{ value: "DRAFT", label: "Brouillon" }, { value: "PUBLISHED", label: "Publié" }, { value: "ARCHIVED", label: "Archivé" }] },
]

function AdminCommuniqueForm() {
  const { id } = useParams({ from: "/admin/communiques/$id" })
  const [item, setItem] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const isNew = id === "new"

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/communiques/${id}`)
        .then((r) => r.json())
        .then((data) => setItem(data.communique || {}))
    }
  }, [id])

  const handleSubmit = async (data: any) => {
    setLoading(true)
    const token = localStorage.getItem("auth_token")
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/communiques" : `/api/communiques/${id}`
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    setLoading(false)
    navigate({ to: "/admin/communiques" })
  }

  return (
    <AdminShell>
      <AdminForm
        title="Communiqué"
        item={item}
        fields={fields}
        onSubmit={handleSubmit}
        backPath="/admin/communiques"
        loading={loading}
      />
    </AdminShell>
  )
}
