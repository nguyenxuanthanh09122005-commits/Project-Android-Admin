import React, { useState } from 'react'
import { CreateMovies, EditMovies } from '../services/moviesAPI';
import type { MoviesTypeResponse } from '../type/typeMovies';
import { toast } from 'react-toastify';
// import { loadGenres } from './listGenres';
import { GenresStore } from '../store/GenresStore';
import { getUploadUrl } from '../services/apiUpload';
export type ReloadData = {
    movieItem: MoviesTypeResponse | null,
    reloadData: () => void,
    onSuccess: () => void,
}
export default function FormMovies(props: ReloadData) {
    const { genres_zustand } = GenresStore();
    console.log(genres_zustand, "genres_zustand");

    const { movieItem, reloadData, onSuccess } = props;
    const [previewImage, setPreviewImage] = useState<string>(movieItem ? movieItem.posterImage : '');
    const [loading, setLoading] = useState(false);
    console.log(loading);
    // loadGenres();
    console.log(genres_zustand, "genresssssssss");

    const [formData, setFormData] = useState({
        movieName: movieItem ? movieItem.movieName : '',
        description: movieItem ? movieItem.description : '',
        duration: movieItem ? movieItem.duration : 0,
        releaseDate: movieItem ? new Date(movieItem.releaseDate).toISOString().split('T')[0] : '',
        posterImage: movieItem ? movieItem.posterImage : '',
        trailerUrl: movieItem ? movieItem.trailerUrl : '',
        status: movieItem ? movieItem.status : 'COMING_SOON',
        genreIds: movieItem ? movieItem.genres.map((genre) => genre.genreId) : [],
        ageRating: movieItem ? movieItem.ageRating : 'P'
    });
    console.log(formData);
    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            status: formData.releaseDate && new Date(formData.releaseDate) > new Date() ? 'COMING_SOON' : 'SHOWING',
        });
    }
    console.log(formData, "formData");

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = URL.createObjectURL(file!);
            setPreviewImage(url);
            const res = await getUploadUrl(file);
            console.log(res, "resUpload");
            setPreviewImage(res.posterImage);
            setFormData({ ...formData, posterImage: res.posterImage });
        } catch (error) {
            console.error("Error uploading file:", error);
        }

    }
    console.log(previewImage, "ppppppp");

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, genreIds: !formData.genreIds.includes(Number(value)) ? [...formData.genreIds, Number(value)] : formData.genreIds });
        } else {
            setFormData({ ...formData, genreIds: formData.genreIds.filter((id) => id !== Number(value)) });
        }
        console.log(checked, "checked");

    }
    console.log(formData, "formData");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const uploadForm = {
            movieName: formData.movieName,
            description: formData.description,
            duration: Number(formData.duration),
            releaseDate: formData.releaseDate,
            posterImage: formData.posterImage,
            trailerUrl: formData.trailerUrl,
            status: formData.status,
            genreIds: formData.genreIds.map((id) => Number(id)),
            ageRating: formData.ageRating
        }
        if (uploadForm.movieName == '' ||
            uploadForm.description == '' ||
            uploadForm.duration == 0 ||
            uploadForm.releaseDate == '' ||

            uploadForm.trailerUrl == '' ||
            uploadForm.genreIds.length === 0 ||
            uploadForm.ageRating == '') {
            alert("Vui lòng điền đủ thông tin");
        }
        try {
            if (movieItem) {
                const res = await EditMovies(movieItem.movieId, uploadForm)
                console.log(res);
                onSuccess();
                toast.success('Update phim thành công!')
                console.log("Editing movie with ID:", movieItem.movieId);
                reloadData()
            } else {
                const res = await CreateMovies(uploadForm)
                console.log(res);
                onSuccess();
                toast.success('Thêm phim thành công!')
                console.log("Creating new movie with data:", uploadForm);
                reloadData()
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="min-h-screen bg-background p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200/60 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-8 border-b border-brand-700/20">
                    <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                        <svg className="w-6 h-6 mr-3 text-brand-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        {movieItem ? 'Chỉnh Sửa Phim' : 'Thêm Phim Mới Vào Hệ Thống'}
                    </h2>
                    <p className="text-brand-100 text-sm mt-2 ml-9 font-medium">Vui lòng điền đầy đủ thông tin để khởi tạo dữ liệu phim</p>
                </div>

                <form className="p-8 space-y-8">

                    {/* Section 1: Thông tin cơ bản */}
                    <section>
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1.5 bg-brand-500 rounded-full"></div>
                            <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest text-xs">Thông tin định danh</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Tên bộ phim</label>
                                <input
                                    value={formData.movieName}
                                    onChange={handleFormData}
                                    name='movieName'
                                    type="text"
                                    placeholder="Ví dụ: Avengers: Endgame"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-zinc-700 mb-3">Thể loại:</label>
                            <div className="flex flex-wrap gap-3 mb-6">
                            {genres_zustand.map((genre) => (
                                <label key={genre.genreId} className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors">
                                    <input
                                        name={genre.genreName}
                                        onChange={handleCheckboxChange}
                                        value={genre.genreId}
                                        checked={formData.genreIds.includes(genre.genreId)}
                                        type="checkbox"
                                        className="w-4 h-4 text-brand-600 bg-white border-zinc-300 rounded focus:ring-brand-500 focus:ring-2"
                                    />
                                    <span className="text-zinc-700 text-sm font-medium">{genre.genreName}</span>
                                </label>)
                            )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Giới hạn độ tuổi</label>
                                    <select
                                        value={formData.ageRating}
                                        onChange={handleFormData}
                                        name='ageRating' className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 outline-none cursor-pointer appearance-none font-medium text-zinc-800 focus:ring-4 focus:ring-brand-500/10 transition-all">
                                        <option value="P">P - Mọi lứa tuổi</option>
                                        <option value="K">K - Dưới 13 tuổi</option>
                                        <option value="T13">T13 - Trên 13 tuổi</option>
                                        <option value="T16">T16 - Trên 16 tuổi</option>
                                        <option value="T18">T18 - Trên 18 tuổi</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Thời lượng (phút)</label>
                                    <input
                                        value={formData.duration}
                                        onChange={handleFormData}
                                        name='duration'
                                        type="number"
                                        placeholder="120"
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-zinc-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Ngày khởi chiếu</label>
                                    <input
                                        value={formData.releaseDate}
                                        onChange={handleFormData}
                                        name='releaseDate'
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all cursor-pointer font-medium text-zinc-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Trạng thái (Tự động)</label>
                                    <input
                                        value={formData.status}
                                        onChange={handleFormData}
                                        name='status'
                                        type="text"
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 outline-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Truyền thông */}
                    <section className="mt-8">
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1.5 bg-rose-500 rounded-full"></div>
                            <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest text-xs">Hình ảnh & Trailer</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Poster</label>
                                <input
                                    onChange={handleFile}
                                    name='posterImage'
                                    type="file"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-mono text-xs text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Link Trailer (YouTube)</label>
                                <input
                                    value={formData.trailerUrl}
                                    onChange={handleFormData}
                                    name='trailerUrl'
                                    type="text"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-mono text-sm text-zinc-800 placeholder:text-zinc-400"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Nội dung */}
                    <section className="mt-8">
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1.5 bg-amber-500 rounded-full"></div>
                            <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest text-xs">Nội dung tóm tắt</h3>
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={handleFormData}
                            name='description'
                            rows={5}
                            placeholder="Nhập mô tả phim tại đây..."
                            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none text-sm text-zinc-800 placeholder:text-zinc-400 leading-relaxed"
                        ></textarea>
                    </section>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-8 border-t border-zinc-100 mt-8">
                        <button
                            onClick={onSuccess}
                            type="button"
                            className="px-6 py-3 rounded-xl font-semibold text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors cursor-pointer"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={(e) => { handleSubmit(e) }}
                            className="px-10 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {movieItem ? 'Cập nhật Phim' : 'Tạo Phim Mới'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
