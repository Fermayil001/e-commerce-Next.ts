import DetailClient from "@/components/detail/DetailClient"
import { SAMPLE_PRODUCTS } from "@/data/data"

interface PageProps {
  params: Promise<{ id: string }>
}

const ProdoctDetail = async ({ params }: PageProps) => {

  const { id } = await params

  const product = SAMPLE_PRODUCTS?.find((product) => product.id.toString() === id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <DetailClient product={product} />
    </div>
  )
}

export default ProdoctDetail