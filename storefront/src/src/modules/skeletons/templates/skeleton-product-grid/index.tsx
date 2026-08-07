import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonProductGrid = () => {
  return (
    <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 small:gap-x-12 gap-y-10 small:gap-y-16 flex-1" data-testid="products-list-loader">
      {repeat(9).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonProductGrid
