import { HttpTypes } from "@medusajs/types"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 small:gap-6">
      {images.map((image, index) => {
        if (!image.url) {
          return null
        }

        return (
          <div
            key={image.id}
            id={image.id}
            className="relative w-full overflow-hidden bg-ui-bg-subtle rounded-base"
          >
            <img
              src={image.url}
              alt={`Product image ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full h-auto"
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImageGallery
