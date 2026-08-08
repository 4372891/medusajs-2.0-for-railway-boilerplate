import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-ui-fg-muted hover:text-ui-fg-base transition-colors mb-3"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="text-2xl small:text-3xl text-ui-fg-base"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.description && (
        <p
          className="text-base-regular text-ui-fg-subtle whitespace-pre-line mt-5"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
