import { useNavigate } from "react-router-dom";
import type { MoviesTypeResponse } from "../type/typeMovies";

export type MovieCardType = {
    item: MoviesTypeResponse,
    handleIsOpen: (id: number) => void,
    handleEdit: () => void,
    handleDelete: (id: number) => void,
}
export const MovieCard = (props: MovieCardType) => {
    const navigate = useNavigate();
    const { item, handleIsOpen, handleEdit, handleDelete } = props;
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Poster Image */}
            <div onClick={() => navigate(`/movies/${item.movieId}`)} className="relative aspect-[2/3] overflow-hidden bg-gray-200">
                <img
                    src={item.posterImage}
                    alt={item.movieName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Age Badge */}
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg uppercase">
                    {item.ageRating}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-gray-900 font-bold text-sm truncate mb-3" title={item.movieName}>
                    {item.movieName}
                </h3>

                {/* Admin Buttons */}
                <div className="flex gap-2 mt-auto">
                    <button onClick={() => { handleIsOpen(item.movieId); handleEdit() }} className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-bold py-2 rounded-lg border border-amber-200 transition-colors flex items-center justify-center">
                        Sửa
                    </button>
                    <button onClick={() => handleDelete(item.movieId)} className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold py-2 rounded-lg border border-rose-200 transition-colors flex items-center justify-center">
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
};