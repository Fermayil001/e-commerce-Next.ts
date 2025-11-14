import Image from 'next/image'
import CsButton from '../ui/CsButton'

const addresses = [
    { id: 1, type: "Home", address: "123 Baku Street, Baku 1000, Azerbaijan", isDefault: true },
    { id: 2, type: "Work", address: "456 Business Ave, Baku 2000, Azerbaijan", isDefault: false },
]

const AddressesTab = () => {
    return (
        <div className='flex-1 outline-none space-y-6'>
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Saved Addresses</h3>
                <CsButton size="small">+ Add Address</CsButton>
            </div>
            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className='flex flex-col gap-6 rounded-xl bg-cswhite bordercs py-6'>
                        <div className="pt-6 px-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <Image
                                        src="/map-pin.svg"
                                        alt="Map Pin"
                                        width={24}
                                        height={24}
                                        className="text-green-700 mt-1"
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-900">{addr.type}</p>
                                        <p className="text-slate-600">{addr.address}</p>
                                       {/*  {addr.isDefault && (
                                            <span className="text-xs font-medium text-green-700">Default Address</span>
                                        )} */}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <CsButton size="small" variant="secondary">
                                        Edit
                                    </CsButton>
                                    <CsButton size="small" variant="secondary" className="text-red-600 bg-transparent">
                                        Delete
                                    </CsButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddressesTab