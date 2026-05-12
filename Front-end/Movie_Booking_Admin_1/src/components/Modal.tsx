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
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Nội dung Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">
                        {/* {title} */}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                {/* Body (Có scroll nếu nội dung dài) */}
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {/* <div className="flex items-center justify-end p-6 space-x-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md cursor-pointer"
                    >
                        Xác nhận
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Modal;