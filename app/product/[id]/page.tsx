import DetailClient from "@/components/detail/DetailClient"

interface PageProps {
  params: Promise<{ id: string }>
}

const ProdoctDetail = async ({ params }: PageProps) => {

  const { id } = await params

  return <DetailClient id={id} />
}

export default ProdoctDetail