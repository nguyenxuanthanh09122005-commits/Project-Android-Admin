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
            className="group bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all duration-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md"
        >
            <div
                className="flex items-center gap-4 flex-1 cursor-pointer w-full"
                onClick={() => navigate(`/cinemas/${cinema.cinemaId}`)}
            >
                {/* Icon/Logo Placeholder */}
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center text-indigo-500 shrink-0">
                    <span className="text-2xl">🏛️</span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 truncate">
                            {cinema.cinemaName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                            Rạp #{cinema.cinemaId}
                        </span>
                    </div>

                    {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                            <span className="text-blue-500">📍</span>
                            <span className="font-medium text-slate-600">{cinema.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-slate-400">🏢</span>
                            <span className="truncate max-w-[200px] md:max-w-[400px]">{cinema.address}</span>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                <button
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleIsOpen();
                        handleEdit();
                    }}
                >
                    <span>✏️</span> Sửa
                </button>
                <button
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 hover:border-rose-200 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(cinema.cinemaId);
                    }}
                >
                    <span>🗑️</span> Xóa
                </button>
            </div>
        </div>
    )
}
