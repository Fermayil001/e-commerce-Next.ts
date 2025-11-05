
const Category = () => {
    const categories = [
        {id: 1, name: 'Electronics' },
        {id: 2, name: 'Clothing' },
        {id: 3, name: 'Books' },
        {id: 4, name: 'Home & Kitchen' },
        {id: 5, name: 'Sports' },
    ]
  return (
    <div className="flex items-center justify-center gap-4 px-5 md:px-10 py-3 overflow-x-scroll">
        {
            categories.map((category) => (
                <div key={category.id} className="border border-slate-500 min-w-[130px] cursor-pointer my-5 md:my-10 flex items-center justify-center flex-1  py-2 rounded-md">
                    {category.name}
                </div>
            ))
        }
    </div>
  )
}

export default Category