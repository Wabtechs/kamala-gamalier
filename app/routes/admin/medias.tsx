import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState, useRef } from "react"
import { Button, Card, CardContent, Input } from "@/components/ui"
import { Upload, Trash2, Image, File, Loader2 } from "lucide-react"

export const Route = createFileRoute("/admin/medias")({
  component: AdminMedia,
})

function AdminMedia() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    const res = await fetch("/api/media")
    const data = await res.json()
    setItems(data.media || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const token = localStorage.getItem("auth_token")
      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ file: reader.result, name: file.name }),
      })
      setUploading(false)
      await load()
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("auth_token")
    await fetch(`/api/media/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Médias</h1>
        <div>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf" />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Uploader
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">Aucun média.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item: any) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <CardContent className="p-2">
                <div className="aspect-square rounded-md bg-muted flex items-center justify-center overflow-hidden mb-2">
                  {item.mime?.startsWith("image/") ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <File className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-3 right-3 bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
