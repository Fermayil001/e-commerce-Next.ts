'use client'
import CsButton from "../ui/CsButton"

const Hero = () => {
    return (
        <div className="mb-16 flex flex-col items-center justify-center rounded-lg bg-linear-to-br from-slate-50 to-slate-100 px-8 py-20 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">LOTOSIA incə zövq kolleksiyası</h1>
            <p className="mb-8 max-w-2xl text-lg text-slate-600">
                Hər bir parçadakı zərifliyi və incəliyi kəşf edin. Zövqlə seçilmiş lüks məhsullar, incə zövqlər üçün hazırlanmışdır.
            </p>
            <CsButton
                size="medium"
                text="Kolleksiyanı kəşf et"
                variant="primary"
                onClick={() => alert('Asagi gedejek')}
            />
            {/* <Link href="#products">Explore Collection</Link> */}
        </div>
    )
}

export default Hero