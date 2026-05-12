
import type { CinemaType } from '../type/typeCinema'
import { useNavigate } from 'react-router-dom';


export interface CinemaCardProps {
    cinema: CinemaType,
    handleIsOpen: () => void,
    handleEdit: () => void,
    handleDelete: (id: number) => void,
}
export default function CinemaCard(props: CinemaCardProps) {
    const navigate = useNavigate();
    const { cinema, handleIsOpen, handleEdit, handleDelete } = props;
    return (
        <div
            key={cinema.cinemaId}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
        >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>

            {/* Card Content */}
            <div className="p-6">
                {/* Cinema Name */}
                <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                    {cinema.cinemaName}
                </h2>

                {/* Info Items */}
                <div className="space-y-3" onClick={() => navigate(`/cinemas/${cinema.cinemaId}`)}>
                    {/* City */}
                    <div className="flex items-start gap-3">
                        <span className="text-blue-500 text-xl">📍</span>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Thành phố</p>
                            <p className="text-gray-900 font-semibold">{cinema.city}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">🏢</span>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Địa chỉ</p>
                            <p className="text-gray-900 font-semibold line-clamp-2">
                                {cinema.address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-2">
                    <button
                        className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-bold py-2 rounded-lg border border-amber-200 transition-colors flex items-center justify-center"
                        onClick={() => {
                            handleIsOpen(); handleEdit();
                        }}
                    >
                        Sửa
                    </button>
                    <button
                        className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold py-2 rounded-lg border border-rose-200 transition-colors flex items-center justify-center"
                        onClick={() => handleDelete(cinema.cinemaId)}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}
