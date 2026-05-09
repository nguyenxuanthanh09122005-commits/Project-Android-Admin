import React, { useState } from 'react'
import { CreateMovies } from '../services/moviesAPI';
export type ReloadData = {
    reloadData: () => void,
    onSuccess: () => void,
}
export default function FormMovies(props: ReloadData) {
    const { reloadData, onSuccess } = props;
    const [loading, setLoading] = useState(false);
    console.log(loading);

    const [formData, setFormData] = useState({
        movieName: '',
        description: '',
        duration: 0,
        releaseDate: '',
        posterImage: '',
        trailerUrl: '',
        genre: '',
        ageRating: 'P'
    });
    console.log(formData);
    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: name === "releaseDate" ? new Date(value) : value });
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
            genre: formData.genre,
            ageRating: formData.ageRating
        }
        if (uploadForm.movieName == '' ||
            uploadForm.description == '' ||
            uploadForm.duration == 0 ||
            uploadForm.releaseDate == '' ||
            uploadForm.posterImage == '' ||
            uploadForm.trailerUrl == '' ||
            uploadForm.genre == '') {
            alert("Vui lòng điền đủ thông tin");
        }
        try {
            const res = await CreateMovies(uploadForm)
            console.log(res);
            onSuccess();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-indigo-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        Thêm Phim Mới Vào Hệ Thống
                    </h2>
                    <p className="text-indigo-100 text-sm mt-1 ml-9">Vui lòng điền đầy đủ thông tin để khởi tạo dữ liệu phim</p>
                </div>

                <form className="p-8 space-y-8">

                    {/* Section 1: Thông tin cơ bản */}
                    <section>
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1 bg-indigo-600 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider text-sm">Thông tin định danh</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Tên bộ phim</label>
                                <input
                                    onChange={handleFormData}
                                    name='movieName'
                                    type="text"
                                    placeholder="Ví dụ: Avengers: Endgame"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Thể loại</label>
                                <input
                                    onChange={handleFormData}
                                    name='genre'
                                    type="text"
                                    placeholder="Hành động, Viễn tưởng..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Giới hạn độ tuổi</label>
                                <select
                                    onChange={handleFormData}
                                    name='ageRating' className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-white cursor-pointer appearance-none">
                                    <option value="P">P - Mọi lứa tuổi</option>
                                    <option value="K">K - Dưới 13 tuổi</option>
                                    <option value="T13">T13 - Trên 13 tuổi</option>
                                    <option value="T16">T16 - Trên 16 tuổi</option>
                                    <option value="T18">T18 - Trên 18 tuổi</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Thời lượng (phút)</label>
                                <input
                                    onChange={handleFormData}
                                    name='duration'
                                    type="number"
                                    placeholder="120"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Ngày khởi chiếu</label>
                                <input
                                    // value={formData.releaseDate instanceof Date && !isNaN(formData.releaseDate.getTime())
                                    //     ? formData.releaseDate.toISOString().split('T')[0]
                                    //     : ""}
                                    onChange={handleFormData}
                                    name='releaseDate'
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Truyền thông */}
                    <section>
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1 bg-rose-500 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider text-sm">Hình ảnh & Trailer</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Poster</label>
                                <input
                                    onChange={handleFormData}
                                    name='posterImage'
                                    type="text"
                                    placeholder="https://image.com/poster.jpg"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Link Trailer (YouTube)</label>
                                <input
                                    value={formData.trailerUrl}
                                    onChange={handleFormData}
                                    name='trailerUrl'
                                    type="text"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Nội dung */}
                    <section>
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="h-5 w-1 bg-amber-500 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider text-sm">Nội dung tóm tắt</h3>
                        </div>
                        <textarea
                            onChange={handleFormData}
                            name='description'
                            rows={4}
                            placeholder="Nhập mô tả phim tại đây..."
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                        ></textarea>
                    </section>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                        <button
                            onClick={onSuccess}
                            type="button"
                            className="px-6 py-2.5 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={(e) => { handleSubmit(e); reloadData() }}
                            className="px-10 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                        >
                            Tạo Phim Mới
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
