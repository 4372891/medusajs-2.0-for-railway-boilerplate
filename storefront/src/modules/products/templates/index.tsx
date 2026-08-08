import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const images = product?.images || []

  return (
    <>
      <div
        className="content-container py-8 small:py-16"
        data-testid="product-container"
      >
        <div className="flex flex-col small:flex-row gap-10 small:gap-12 medium:gap-20">
          <div className="w-full small:w-1/2 flex-1">
            <ImageGallery images={images} />
          </div>

          <div className="w-full small:w-1/2 flex-1">
            <div className="small:sticky small:top-28 flex flex-col gap-y-8 small:max-w-md">
              <ProductInfo product={product} />
              <ProductOnboardingCta />
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="content-container mb-16 small:mb-26"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
