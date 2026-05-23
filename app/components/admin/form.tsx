import { Link } from "@tanstack/react-router"
import { Button, Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Save, ArrowLeft } from "lucide-react"

interface AdminFormProps {
  title: string
  item: any
  fields: { key: string; label: string; type: "text" | "textarea" | "select" | "date"; options?: { value: string; label: string }[] }[]
  onSubmit: (data: any) => void
  backPath: string
  loading?: boolean
}

export function AdminForm({ title, item, fields, onSubmit, backPath, loading }: AdminFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))
    onSubmit(data)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to={backPath}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader><CardTitle>{item.id ? "Modifier" : "Créer"}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.key}
                    name={field.key}
                    defaultValue={item[field.key] || ""}
                    required
                  />
                ) : field.type === "select" ? (
                  <Select name={field.key} defaultValue={item[field.key] || field.options?.[0]?.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "date" ? (
                  <Input
                    id={field.key}
                    name={field.key}
                    type="datetime-local"
                    defaultValue={item[field.key] ? item[field.key].slice(0, 16) : ""}
                  />
                ) : (
                  <Input
                    id={field.key}
                    name={field.key}
                    defaultValue={item[field.key] || ""}
                    required={field.key === "title" || field.key === "name"}
                  />
                )}
              </div>
            ))}
            <div className="pt-4 flex gap-2">
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />{loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <Link to={backPath}>
                <Button variant="outline" type="button">Annuler</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
