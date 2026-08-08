import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonProductGrid = () => {
  return (
    <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 small:gap-x-8 gap-y-10 small:gap-y-12 flex-1" data-testid="products-list-loader">
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonProductGrid
