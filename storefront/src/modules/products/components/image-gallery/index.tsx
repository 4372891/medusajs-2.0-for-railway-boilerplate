import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative w-full overflow-hidden bg-ui-bg-subtle p-0"
              id={image.id}
            >
              {!!image.url && (
                <img
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  loading={index <= 2 ? "eager" : "lazy"}
                  className="w-full h-auto rounded-rounded"
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
