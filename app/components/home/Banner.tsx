import Image from "next/image"
import banner from "../../../public/banner.jpg"

const Banner = () => {
  return (
    <div className="h-64 md:h-64 flex items-center justify-center bg-slate-200">
        <div className="relative w-full h-[200px]">
            <Image src={banner} alt="banner" fill className="object-cover"/>
        </div>
    </div>
  )
}

export default Banner