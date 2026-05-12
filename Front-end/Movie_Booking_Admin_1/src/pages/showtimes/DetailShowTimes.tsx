import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ShowTimesResponse } from '../../type/typeShowTimes';
import { getShowTimeById } from '../../services/apiShowTimes';
import Modal from '../../components/Modal';
import FormShowTimes from '../../components/FormShowTimes';

export type DetailShowTimesProps = {

    onClose: () => void,

}
export default function DetailShowTimes(props: DetailShowTimesProps) {
    const { onClose } = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [isOpen, setIsOpen] = useState(false);
    console.log(loading);

    const [showtime, setShowtime] = React.useState<ShowTimesResponse>({
        showtimeId: 0,
        movieId: 0,
        cinemaId: 0,
        roomId: 0,
        movieName: '',
        cinemaName: '',
        roomName: '',
        startTime: new Date(),
        endTime: new Date(),
        baseTicketPrice: 0
    });
    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const formatTime = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const fetchShowTimeDetail = async (id: number) => {
        setLoading(true);
        try {
            const res = await getShowTimeById(id);
            setShowtime(res);
        } catch (error) {
            console.error('Failed to fetch showtime details:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchShowTimeDetail(Number(id));
        }
    }, [id]);



    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 px-3 py-1.5 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition text-sm font-semibold"
                        >
                            ← Quay lại
                        </button>
                        <h1 className="text-4xl font-bold text-gray-900">Chi tiết Suất Chiếu</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Movie Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎬 Thông Tin Phim</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">Tên Phim</p>
                                    <p className="text-lg font-semibold text-gray-900">{showtime.movieName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">ID Phim</p>
                                    <p className="text-lg font-semibold text-gray-900">{showtime.movieId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Cinema & Room Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎪 Địa điểm Chiếu</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">Tên Rạp</p>
                                    <p className="text-lg font-semibold text-gray-900">{showtime.cinemaName}</p>
                                    <p className="text-xs text-gray-500 mt-1">ID: {showtime.cinemaId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold mb-1">Phòng Chiếu</p>
                                    <p className="text-lg font-semibold text-gray-900">{showtime.roomName}</p>
                                    <p className="text-xs text-gray-500 mt-1">ID: {showtime.roomId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Time Information Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">⏰ Lịch Chiếu</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-sm text-gray-600 font-semibold mb-2">📅 Ngày</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {formatDate(showtime.startTime)}
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <p className="text-sm text-gray-600 font-semibold mb-2">🕐 Bắt đầu</p>
                                    <p className="text-lg font-bold text-green-600">
                                        {formatTime(showtime.startTime)}
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <p className="text-sm text-gray-600 font-semibold mb-2">⏱️ Kết thúc</p>
                                    <p className="text-lg font-bold text-orange-600">
                                        {formatTime(showtime.endTime)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Price & Actions */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
                            <p className="text-sm font-semibold mb-2">💰 Giá Vé Cơ Bản</p>
                            <p className="text-4xl font-bold mb-4">
                                {showtime.baseTicketPrice.toLocaleString('vi-VN')}đ
                            </p>
                            <p className="text-xs text-blue-100">
                                * Giá này là giá cơ bản, có thể thay đổi theo loại ghế
                            </p>
                        </div>

                        {/* Showtime ID Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm text-gray-600 font-semibold mb-2">ID Suất Chiếu</p>
                            <p className="text-2xl font-bold text-gray-900 mb-4">{showtime.showtimeId}</p>
                            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                                <p>Mã định danh duy nhất cho suất chiếu này</p>
                            </div>
                        </div>

                        {/* Status Card */}
                        {/* <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm text-gray-600 font-semibold mb-3">📊 Trạng Thái</p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                    ✓ Hoạt động
                                </span>
                            </div>
                        </div> */}

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <button onClick={() => { setIsOpen(true); onClose() }} className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2">
                                ✏️ Chỉnh sửa
                            </button>
                            {/* <button className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold flex items-center justify-center gap-2">
                                🗑️ Xóa
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <FormShowTimes reload={async () => getShowTimeById(showtime.showtimeId)} onClose={() => setIsOpen(false)} showtimeEdited={showtime} />
            </Modal>
        </div>
    );
}
