import { CiSearch } from "react-icons/ci";

interface CsInputProps {
  id?: string
  type?: string
  placeholder: string
  name?: string
}

const CsInput = ({ id, placeholder, type = 'text', name }: CsInputProps) => {
  return (
    <input
      className="
        placeholder:text-csgray
        selection:bg-csgray
        text-csblack
        border-csborder
        h-9 w-full min-w-0
        rounded-md
        border bg-transparent
        px-3 py-1
        text-base md:text-sm
        shadow-xs
        transition-all
        outline-none
        focus:border-ring
        focus-visible:ring-ring/50
        focus-visible:ring-2
        "
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
    />


  )
}

export default CsInput

{/* <input type="text" className="rounded-l-md px-3 py-2 w-1/2  outline-none bg-sky-50 text-black" placeholder="Search for products..." /> */ }
{/* <span className="absolute right-0 top-0 px-3 h-full flex items-center bg-[#1a7045] rounded-r-md">
          <CiSearch className="cursor-pointer" size={24} />
        </span> */}