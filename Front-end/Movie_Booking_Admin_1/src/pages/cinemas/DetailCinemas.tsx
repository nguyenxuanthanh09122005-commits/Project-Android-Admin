import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { CinemaType } from '../../type/typeCinema'
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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCinemaDetail();
    }, [id]);

    useEffect(() => {
        if (cinema) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchTheaterRooms();
        }
    }, [cinema, id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium">Đang tải thông tin rạp...</p>
            </div>
        );
    }

    if (error || !cinema) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Quay lại
                </button>
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 text-rose-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <p className="font-bold">{error || 'Không tìm thấy dữ liệu rạp chiếu'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                        <button onClick={() => navigate('/cinemas')} className="hover:text-indigo-600 transition-colors">Quản lý rạp</button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-slate-600">Chi tiết rạp chiếu</span>
                    </nav>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {cinema.cinemaName}
                    </h1>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-bold py-2.5 px-5 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95 text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Quay lại
                </button>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Card */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Thông tin cơ bản</h2>
                                <p className="text-sm text-slate-500 font-medium">Chi tiết về địa điểm và định danh rạp</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 hover:bg-white transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thành phố</span>
                                </div>
                                <p className="text-lg font-bold text-slate-800 ml-11">{cinema.city}</p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 hover:bg-white transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Địa chỉ</span>
                                </div>
                                <p className="text-lg font-bold text-slate-800 ml-11 leading-tight">{cinema.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl shadow-xl shadow-indigo-200 p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-6">Trạng thái vận hành</p>
                        <div className="space-y-6">
                            <div>
                                <p className="text-indigo-200 text-sm font-medium mb-1">Tổng số phòng chiếu</p>
                                <p className="text-4xl font-black">{rooms.length}</p>
                            </div>
                            <div className="pt-6 border-t border-indigo-500/30">
                                <p className="text-indigo-200 text-sm font-medium mb-1">Mã hệ thống</p>
                                <p className="text-xl font-bold">CINEMA-#{cinema.cinemaId}</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-10 -top-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
                </div>
            </div>

            {/* List Theater Rooms Component */}
            <div className="pt-4">
                <ListTheater_Rooms reloadData={fetchTheaterRooms} cinemaId={Number(id)} rooms={rooms} loading={roomsLoading} />
            </div>
        </div>
    );
}
