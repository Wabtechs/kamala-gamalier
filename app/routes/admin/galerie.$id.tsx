import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState, useRef } from "react"
import { Button, Input, Label, Textarea, Card, CardContent } from "@/components/ui"
import { Upload, Image, Trash2, Loader2, ArrowLeft, Save } from "lucide-react"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/galerie/$id")({
  component: AdminGalleryForm,
})

function AdminGalleryForm() {
  const { id } = useParams({ from: "/admin/galerie/$id" })
  const navigate = useNavigate()
  const isNew = id === "nouvelle"
  const [gallery, setGallery] = useState<any>({ title: "", description: "", mediaIds: [] })
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [allMedia, setAllMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/media").then((r) => r.json()).then((d) => setAllMedia(d.media || []))
    if (!isNew) {
      fetch(`/api/galleries/${id}`)
        .then((r) => r.json())
        .then((d) => {
          setGallery(d.gallery || { title: "", description: "", mediaIds: [] })
          setMediaItems(d.media || [])
        })
    }
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    const token = localStorage.getItem("auth_token")
    if (isNew) {
      await fetch("/api/galleries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(gallery),
      })
    }
    setLoading(false)
    navigate({ to: "/admin/galerie" })
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const token = localStorage.getItem("auth_token")
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ file: reader.result, name: file.name }),
      })
      const data = await res.json()
      setGallery((g: any) => ({ ...g, mediaIds: [...g.mediaIds, data.media.id] }))
      setAllMedia((prev) => [...prev, data.media])
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const toggleMedia = (mediaId: string) => {
    setGallery((g: any) => ({
      ...g,
      mediaIds: g.mediaIds.includes(mediaId)
        ? g.mediaIds.filter((id: string) => id !== mediaId)
        : [...g.mediaIds, mediaId],
    }))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/galerie">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{isNew ? "Nouvelle galerie" : "Gérer la galerie"}</h1>
      </div>

      <div className="space-y-4 max-w-lg mb-8">
        <div className="space-y-1">
          <Label htmlFor="title">Titre</Label>
          <Input id="title" value={gallery.title} onChange={(e) => setGallery((g: any) => ({ ...g, title: e.target.value }))} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={gallery.description} onChange={(e) => setGallery((g: any) => ({ ...g, description: e.target.value }))} />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={loading || !gallery.title}>
            <Save className="h-4 w-4 mr-2" />{loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Uploader
          </Button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Médias disponibles</h2>
      {allMedia.length === 0 ? (
        <p className="text-muted-foreground">Aucun média. Uploader des images.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {allMedia.map((m: any) => {
            const selected = gallery.mediaIds?.includes(m.id)
            return (
              <button key={m.id} onClick={() => toggleMedia(m.id)}
                className={`aspect-square rounded-lg overflow-hidden border-2 relative ${selected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-muted"}`}
              >
                {m.mime?.startsWith("image/") ? (
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Image className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                {selected && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">✓</div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
