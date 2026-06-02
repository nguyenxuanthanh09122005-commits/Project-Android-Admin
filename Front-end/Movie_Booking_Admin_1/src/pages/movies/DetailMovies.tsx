import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailMovies } from '../../services/moviesAPI';
// import type { MoviesType } from '../../type/typeMovies';
import type { GenreType } from '../../type/typeGenre';
import type { MoviesTypeResponse } from '../../type/typeMovies';

export default function DetailMovies() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [itemMovies, setItemMovies] = useState<MoviesTypeResponse>({
        movieId: 0,
        movieName: "",
        description: "",
        duration: 0,
        releaseDate: new Date(),
        posterImage: "",
        trailerUrl: "",
        status: "COMING_SOON",
        genres: [{
            genreId: 0,
            genreName: "",
        }],
        ageRating: ""

    });
    console.log(itemMovies);

    console.log(loading);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await getDetailMovies(Number(id));
                console.log(res, "detail_Movies");
                setItemMovies(res);
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id])

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header điều hướng */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {itemMovies.movieName}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Hệ thống Quản trị &gt; Danh sách phim &gt; <span className="text-indigo-600">ID #{itemMovies.movieId}</span>
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all"
                    >
                        Quay lại
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Cột trái: Media */}
                <div className="xl:col-span-1 space-y-6">
                    {/* Poster Phim */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Poster hiển thị</h3>
                        <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                            <img
                                src={itemMovies.posterImage}
                                alt={itemMovies.movieName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Trailer Link */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Trailer Video</h3>
                        <a
                            href={itemMovies.trailerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center p-3 bg-indigo-50 rounded-xl border border-indigo-100 group"
                        >
                            <span className="text-indigo-600 text-sm font-medium truncate group-hover:underline">
                                {itemMovies.trailerUrl}
                            </span>
                            <svg className="w-4 h-4 ml-auto text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Cột phải: Content */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Thông tin chi tiết */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4">Thông số kỹ thuật</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Thể loại</p>
                                <p className="text-gray-900 font-semibold bg-gray-100 inline-block px-3 py-1 rounded-lg">
                                    {itemMovies.genres.map((genre: GenreType) => genre.genreName).join(", ")}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Độ tuổi</p>
                                <p className={`font-bold inline-block px-3 py-1 rounded-lg ${itemMovies.ageRating === 'T18' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                    {itemMovies.ageRating}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Thời lượng</p>
                                <p className="text-gray-900 font-semibold">{itemMovies.duration} phút</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Trạng thái</p>
                                <p className="text-gray-900 font-semibold">{itemMovies.status}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Ngày khởi chiếu</p>
                                <p className="text-gray-900 font-semibold">
                                    {new Date(itemMovies.releaseDate).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Mô tả */}
                        <div className="mt-12">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mô tả tóm tắt</h3>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <p className="text-gray-700 leading-relaxed italic">
                                    "{itemMovies.description}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="flex items-start p-5 bg-amber-50 border border-amber-100 rounded-2xl shadow-sm">
                        <div className="p-2 bg-amber-100 rounded-lg mr-4">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-amber-900">Lưu ý bảo mật dữ liệu</p>
                            <p className="text-xs text-amber-700 mt-1">
                                Mọi thay đổi về thông tin phim sẽ được lưu vết bởi hệ thống. Vui lòng kiểm tra kỹ <b>Thời lượng</b> và <b>Ngày khởi chiếu</b> trước khi lưu để tránh sai lệch lịch chiếu hiện hành.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

        ;
}
