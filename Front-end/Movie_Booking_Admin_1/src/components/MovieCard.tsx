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
    console.log(item.posterImage, "imagessssssssss");

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            {/* Poster Image */}
            <div onClick={() => navigate(`/movies/${item.movieId}`)} className="relative aspect-[2/3] overflow-hidden bg-zinc-100 cursor-pointer">
                <img
                    src={item.posterImage}
                    alt={item.movieName}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Age Badge */}
                <div className="absolute top-3 left-3 bg-brand-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg uppercase tracking-wider border border-white/10">
                    {item.ageRating}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-zinc-800 font-bold text-sm leading-tight line-clamp-2 mb-4 group-hover:text-brand-600 transition-colors cursor-pointer" title={item.movieName} onClick={() => navigate(`/movies/${item.movieId}`)}>
                    {item.movieName}
                </h3>

                {/* Admin Buttons */}
                <div className="flex gap-2 mt-auto">
                    <button onClick={() => { handleIsOpen(item.movieId); handleEdit() }} className="flex-1 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 text-xs font-semibold py-2 rounded-xl border border-zinc-200 transition-all shadow-sm hover:shadow">
                        Chỉnh sửa
                    </button>
                    <button onClick={() => handleDelete(item.movieId)} className="flex-1 bg-white hover:bg-rose-50 text-rose-600 text-xs font-semibold py-2 rounded-xl border border-rose-200 hover:border-rose-300 transition-all shadow-sm hover:shadow">
                        Xóa phim
                    </button>
                </div>
            </div>
        </div>
    )
};