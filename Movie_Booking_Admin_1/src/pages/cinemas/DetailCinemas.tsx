
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { CinemaType } from '../../type/typeCinema'

// import ListTheater_Rooms from '../../components/ListTheater_Rooms';

import { getDetailCinemas } from '../../services/cinemaAPI';
import type { TheaterRoomType } from '../../type/typeTheaterRooms';
import { getListTheaterRooms } from '../../services/theater_roomsAPI';
import ListTheater_Rooms from '../../components/ListTheater_Rooms';



export default function DetailCinemas() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cinema, setCinema] = useState<CinemaType | null>(null);
    const [loading, setLoading] = useState(true);
    const [roomsLoading, setRoomsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rooms, setRooms] = useState<TheaterRoomType[]>([]);


    const fetchCinemaDetail = async () => {
        try {
            setLoading(true);
            const response = await getDetailCinemas(Number(id));
            setCinema(response);
            setError(null);
        } catch (err: unknown) {
            setError('Lỗi tải dữ liệu rạp chiếu');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTheaterRooms = async () => {
        try {
            setRoomsLoading(true);
            const response = await getListTheaterRooms(Number(id));
            setRooms(response);
        } catch (err: unknown) {
            console.error('Lỗi tải danh sách phòng chiếu:', err);
            setRooms([]);
        } finally {
            setRoomsLoading(false);
        }
    };
    console.log(rooms, "rooms");



    console.log(cinema, "cinema");

    useEffect(() => {
        fetchCinemaDetail();
    }, [id]);

    useEffect(() => {
        if (cinema) {
            fetchTheaterRooms();
        }
    }, [cinema, id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !cinema) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
                        >
                            ← Quay lại
                        </button>
                    </div>
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        {error || 'Không tìm thấy dữ liệu rạp chiếu'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    ← Quay lại
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Header Background */}
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-32"></div>

                    {/* Content */}
                    <div className="px-8 py-8 -mt-16 relative">
                        {/* Cinema Icon & Name Section */}
                        <div className="flex items-start gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                                <span className="text-5xl">🎬</span>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {cinema.cinemaName}
                                </h1>
                                <p className="text-gray-500 text-lg">
                                    Mã rạp: <span className="font-semibold">#{cinema.cinemaId}</span>
                                </p>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* City Info */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">📍</span>
                                    <h3 className="text-lg font-bold text-gray-900">Thành phố</h3>
                                </div>
                                <p className="text-gray-700 text-lg font-semibold ml-12">
                                    {cinema.city}
                                </p>
                            </div>

                            {/* Address Info */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">🏢</span>
                                    <h3 className="text-lg font-bold text-gray-900">Địa chỉ</h3>
                                </div>
                                <p className="text-gray-700 text-lg font-semibold ml-12">
                                    {cinema.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ListTheater_Rooms cinemaId={Number(id)} rooms={rooms} loading={roomsLoading} />
        </div>
    );
}
