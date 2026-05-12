
import type { getMovieIdShowTimes, ShowTimesRequest, ShowTimesResponse } from '../type/typeShowTimes'
import { MovieStore } from '../store/MovieStore';
import { useState } from 'react';
import { CreateShowTimes, EditShowTimes } from '../services/apiShowTimes';
export type FormShowTimesProps = {
    reload?: () => void,
    onClose: () => void,
    showtimeEdited: ShowTimesResponse | null
}

export default function FormShowTimes(props: FormShowTimesProps) {
    const { reload, onClose, showtimeEdited } = props;
    const { movies_zustand } = MovieStore();
    const [loading, setLoading] = useState(false);
    console.log(loading);

    const [formData, setFormData] = useState<ShowTimesRequest>({
        movieId: showtimeEdited ? showtimeEdited.movieId : 0,

        roomId: showtimeEdited ? showtimeEdited.roomId : 0,

        startTime: showtimeEdited ? new Date(showtimeEdited.startTime) : new Date(),

        endTime: showtimeEdited ? new Date(showtimeEdited.endTime) : new Date(),

        baseTicketPrice: showtimeEdited ? showtimeEdited.baseTicketPrice : 0
    });

    movies_zustand.forEach((movie) => {
        console.log(movie.movieId, "movieId");
    });

    // let listMovieId = showTimes.reduce((acc: number[], showtime) => {
    //     if (!acc.includes(showtime.movieId)) {
    //         acc.push(showtime.movieId);
    //     }
    // }, []);

    const listMovieId: getMovieIdShowTimes[] = [];
    movies_zustand.forEach((item) => {
        const ob: getMovieIdShowTimes = { movieId: item.movieId, movieName: item.movieName };
        if (!listMovieId.some((movie) => movie.movieId === ob.movieId)) {
            listMovieId.push(ob);
        }
    })
    // const listRoomId: getRoomIdShowTimes[] = [];
    // movies_zustand.forEach((item) => {
    //     const ob: getRoomIdShowTimes = { roomId: item.roomId, roomName: item.roomName };
    //     listRoomId.push(ob);

    // })
    const formatDateTimeLocal = (date: Date | string) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === 'startTime' || name === 'endTime') ? new Date(value) : value
        }));
    };

    console.log(formData, "formData");
    const uploadForm = {
        movieId: Number(formData.movieId),
        roomId: Number(formData.roomId),
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        baseTicketPrice: Number(formData.baseTicketPrice)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            if (uploadForm.movieId === 0 || uploadForm.roomId === 0 || !uploadForm.startTime || !uploadForm.endTime || uploadForm.baseTicketPrice === 0) {
                alert("Vui lòng điền đầy đủ thông tin");
                return;
            }
            if (uploadForm.startTime >= uploadForm.endTime) {
                alert("Thời gian kết thúc phải sau thời gian bắt đầu");
                return;
            }
            if (uploadForm.baseTicketPrice < 0) {
                alert("Giá vé phải lớn hơn hoặc bằng 0");
                return;
            }
            console.log(uploadForm, "uploadForm");
            if (showtimeEdited) {
                const res = await EditShowTimes(showtimeEdited.showtimeId, uploadForm);
                console.log(res, "resEditShowTimes");
                alert("Cập nhật suất chiếu thành công");
                reload?.();
                onClose();
            } else {
                const res = await CreateShowTimes(uploadForm);
                console.log(res, "resCreateShowTimes");
                alert("Thêm suất chiếu thành công");
                reload?.();
                onClose();
            }

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {showtimeEdited ? 'Chỉnh Sửa Suất Chiếu' : 'Thêm Suất Chiếu Mới'}
                </h2>
                <p className="text-indigo-100 text-sm mt-1 opacity-90">
                    {showtimeEdited ? 'Cập nhật thời gian và phòng chiếu cho phim' : 'Thiết lập thời gian chiếu và giá vé cho phim'}
                </p>
            </div>

            <form className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chọn Phim */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🎬 Chọn phim:</label>
                        <select
                            disabled={showtimeEdited ? true : false}
                            onChange={handleChange}
                            name="movieId"
                            value={formData.movieId}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white"
                        >
                            <option value={0}>-- Chọn phim chiếu --</option>
                            {listMovieId.map((movie) => (
                                <option key={movie.movieId} value={movie.movieId}>
                                    {movie.movieName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Phòng Chiếu */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🚪 Phòng chiếu (ID):</label>
                        <input
                            value={formData.roomId}
                            onChange={handleChange}
                            name='roomId'
                            type="number"
                            placeholder="Ví dụ: 1"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        />
                    </div>

                    {/* Giá Vé */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Giá vé cơ bản (VNĐ):</label>
                        <input
                            value={formData.baseTicketPrice}
                            onChange={handleChange}
                            type="number"
                            name="baseTicketPrice"
                            placeholder="Ví dụ: 75000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        />
                    </div>

                    {/* Thời Gian Bắt Đầu */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Thời gian bắt đầu:</label>
                        <input
                            value={formatDateTimeLocal(formData.startTime)}
                            onChange={handleChange}
                            type="datetime-local"
                            name="startTime"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        />
                    </div>

                    {/* Thời Gian Kết Thúc */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Thời gian kết thúc:</label>
                        <input
                            value={formatDateTimeLocal(formData.endTime)}
                            onChange={handleChange}
                            type="datetime-local"
                            name="endTime"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-8 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading && (
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {showtimeEdited ? 'Cập nhật' : 'Thêm suất chiếu'}
                    </button>
                </div>
            </form>
        </div>
    )
}
