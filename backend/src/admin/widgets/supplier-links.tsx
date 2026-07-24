import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type SupplierRow = {
  productId: string
  title: string
  sku: string
  quantity: number
  supplierUrl: string | null
}

const SupplierLinksWidget = ({ data }: { data: any }) => {
  const [rows, setRows] = useState<SupplierRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const items: any[] = data?.items || []

        if (!items.length) {
          setRows([])
          setLoading(false)
          return
        }

        // Collect the product ids on this order
        const ids = Array.from(
          new Set(
            items
              .map((i) => i.product_id || i?.variant?.product_id)
              .filter(Boolean)
          )
        )

        // Ask the admin API for those products, including external_id
        const params = new URLSearchParams()
        ids.forEach((id) => params.append("id[]", String(id)))
        params.append("fields", "+external_id")

        const res = await fetch(`/admin/products?${params.toString()}`, {
          credentials: "include",
        })

        if (!res.ok) {
          throw new Error(`Could not load products (${res.status})`)
        }

        const json = await res.json()
        const byId: Record<string, any> = {}
        for (const p of json.products || []) {
          byId[p.id] = p
        }

        setRows(
          items.map((i) => {
            const pid = i.product_id || i?.variant?.product_id
            const product = byId[pid]
            return {
              productId: pid,
              title: i.product_title || i.title || product?.title || "Item",
              sku: i.variant_sku || i?.variant?.sku || "",
              quantity: i.quantity ?? 1,
              supplierUrl: product?.external_id || null,
            }
          })
        )
      } catch (e: any) {
        setError(e?.message || "Something went wrong loading supplier links.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [data])

  return (
    <div className="bg-ui-bg-base shadow-elevation-card-rest rounded-lg divide-y">
      <div className="px-6 py-4">
        <h2 className="font-sans font-medium text-base">Supplier links</h2>
      </div>

      <div className="px-6 py-4">
        {loading && (
          <p className="text-ui-fg-subtle text-sm">Loading…</p>
        )}

        {error && <p className="text-sm text-rose-500">{error}</p>}

        {!loading && !error && rows.length === 0 && (
          <p className="text-ui-fg-subtle text-sm">No items on this order.</p>
        )}

        {!loading &&
          !error &&
          rows.map((row) => (
            <div
              key={`${row.productId}-${row.sku}`}
              className="flex flex-col gap-1 py-2"
            >
              <div className="text-sm">
                <span className="font-medium">{row.quantity}×</span>{" "}
                {row.title}
                {row.sku ? (
                  <span className="text-ui-fg-subtle"> — {row.sku}</span>
                ) : null}
              </div>

              {row.supplierUrl ? (
                <a
                  href={row.supplierUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline break-all"
                >
                  {row.supplierUrl}
                </a>
              ) : (
                <span className="text-sm text-ui-fg-subtle">
                  No supplier link saved for this product.
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default SupplierLinksWidget
