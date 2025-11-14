import { IoMdClose } from "react-icons/io";

interface ModalProps {
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const CsModal = ({ onClose, title = "Əlavə et", children }: ModalProps) => {
    return (
        <div className="h-full fixed z-50 inset-0 flex justify-center items-center bg-black/50 overflow-y-auto">
            <div
                style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                className="w-full max-w-md mx-4 bg-cswhite flex flex-col gap-6 rounded-lg md:rounded-xl bordercs py-6 ">
                <div className="flex flex-row items-center justify-between border-b border-csborder px-3 md:px-6 pb-3 md:pb-6">
                    <h5 className="leading-none font-semibold">{title}</h5>
                    <button
                        onClick={onClose}
                        className=" cursor-pointer right-4 top-4 text-gray-500 hover:text-gray-800 transition"
                    >
                        <IoMdClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="md:pt-3 space-y-4 px-3 md:px-6">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default CsModal;
