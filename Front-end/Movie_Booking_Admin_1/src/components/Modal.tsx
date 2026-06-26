import type { ModalProps } from '../type/typeMovies';

// export interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     title: string;
//     children: React.ReactNode;
// }

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
            {/* Lớp phủ Backdrop (Làm mờ nền) */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Nội dung Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-100 transform transition-all flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <h3 className="text-lg font-bold text-zinc-800 tracking-tight">
                        {/* {title} */}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 rounded-full p-2 ml-auto inline-flex items-center transition-colors border border-transparent hover:border-zinc-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Body (Có scroll nếu nội dung dài) */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;