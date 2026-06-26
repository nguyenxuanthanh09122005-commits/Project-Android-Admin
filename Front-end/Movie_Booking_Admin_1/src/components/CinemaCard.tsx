import type { CinemaType } from '../type/typeCinema'
import { useNavigate } from 'react-router-dom';

export interface CinemaCardProps {
    cinema: CinemaType,
    handleIsOpen: () => void,
    handleEdit: () => void,
    handleDelete: (id: number) => void,
}

export default function CinemaCard({ cinema, handleIsOpen, handleEdit, handleDelete }: CinemaCardProps) {
    const navigate = useNavigate();

    return (
        <div
            className="group bg-white hover:bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-5 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm hover:shadow-md hover:border-brand-200/50"
        >
            <div
                className="flex items-center gap-5 flex-1 cursor-pointer w-full"
                onClick={() => navigate(`/cinemas/${cinema.cinemaId}`)}
            >
                {/* Icon/Logo Placeholder */}
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-brand-50/50 border border-brand-100 items-center justify-center text-brand-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a2.25 2.25 0 0 1 2.25-2.25h3a2.25 2.25 0 0 1 2.25 2.25V21m-4.5 0H2.25m0 0h-1.5m1.5 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h3a2.25 2.25 0 0 1 2.25 2.25V21m12 0h-1.5m0 0V5.25A2.25 2.25 0 0 0 19.5 3h-15a2.25 2.25 0 0 0-2.25 2.25V21M9 11.25h.008v.008H9v-.008Zm0 2.25h.008v.008H9v-.008Zm0 2.25h.008v.008H9v-.008Zm0 2.25h.008v.008H9v-.008Zm6-6h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008Z" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-lg font-bold text-zinc-900 truncate group-hover:text-brand-600 transition-colors">
                            {cinema.cinemaName}
                        </h3>
                        <span className="px-2.5 py-1 rounded-md bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-wider border border-brand-100">
                            Rạp #{cinema.cinemaId}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                        <div className="flex items-center gap-1.5">
                            <span className="text-zinc-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11-.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="font-medium text-zinc-600">{cinema.city || "Đang cập nhật"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-zinc-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM15 7.5a.75.75 0 01-.75.75H5.75a.75.75 0 010-1.5h8.5a.75.75 0 01.75.75zm-8.5 4.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5H6.5z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="truncate max-w-[200px] md:max-w-[400px]">{cinema.address || "Chưa có địa chỉ"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-zinc-100 pt-4 sm:pt-0">
                <button
                    className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900 transition-all flex items-center justify-center gap-2 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleIsOpen();
                        handleEdit();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Sửa
                </button>
                <button
                    className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-rose-600 bg-white border border-rose-200 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all flex items-center justify-center gap-2 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(cinema.cinemaId);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Xóa
                </button>
            </div>
        </div>
    )
}
