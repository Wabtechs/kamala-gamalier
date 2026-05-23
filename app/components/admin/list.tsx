import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Column {
  key: string
  label: string
  render?: (value: any, item: any) => string
}

interface AdminListProps {
  title: string
  items: any[]
  columns: Column[]
  basePath: string
  loading?: boolean
  onDelete?: (id: string) => void
}

export function AdminList({ title, items, columns, basePath, loading, onDelete }: AdminListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link to={`${basePath}/new` as any}>
          <Button><Plus className="h-4 w-4 mr-2" />Nouveau</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">Aucun élément.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="text-left p-3 text-sm font-medium text-muted-foreground">{col.label}</th>
                ))}
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id} className="border-t hover:bg-muted/30">
                  {columns.map((col) => (
                    <td key={col.key} className="p-3 text-sm">
                      {col.render ? col.render(item[col.key], item) : item[col.key] ?? "-"}
                    </td>
                  ))}
                  <td className="p-3 text-sm text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`${basePath}/${item.id}` as any}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      {onDelete && (
                        <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
