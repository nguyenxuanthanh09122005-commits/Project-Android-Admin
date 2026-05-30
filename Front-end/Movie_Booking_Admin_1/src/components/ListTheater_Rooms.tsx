import { useState } from 'react'
import type { TheaterRoomType } from '../type/typeTheaterRooms';

import Modal from './Modal';
import FormTheaterRooms from './FormTheaterRooms';
import { DeleteTheaterRooms } from '../services/theater_roomsAPI';
import TheaterRoomsCard from './TheaterRoomsCard';
import { toast } from 'react-toastify';


interface ListTheater_RoomsProps {
    rooms: TheaterRoomType[];
    cinemaId: number;
    loading?: boolean;
    reloadData: () => void;
}

export default function ListTheater_Rooms({
    rooms,
    reloadData,
    cinemaId,
    loading = false,

}: ListTheater_RoomsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState<TheaterRoomType | null>(null);

    const OnClose = () => {
        setIsOpen(false);
    }
    const handleDelete = async (roomId: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phòng này không?")) {
            const res = await DeleteTheaterRooms(roomId);
            console.log(res);
            toast.success('Xóa phòng chiếu thành công!')
            reloadData();
        }
    };
    const handleIsCreate = (room: TheaterRoomType | null) => {
        setIsCreate(room);
    }
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Section Header */}
            <div className="bg-white border-b border-slate-100 px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Danh sách Phòng Chiếu</h2>
                            <p className="text-slate-500 text-sm font-medium">Quản lý không gian trải nghiệm khách hàng</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setIsOpen(true); setIsCreate(null) }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Thêm phòng mới
                    </button>
                </div>
            </div>

            {/* Rooms Content */}
            <div className="p-8 bg-slate-50/50">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-slate-500 font-medium">Đang tải dữ liệu phòng...</p>
                    </div>
                ) : rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <TheaterRoomsCard key={room.roomId} room={room} setIsOpen={() => setIsOpen(true)} setIsCreate={() => handleIsCreate(room)} handleDelete={handleDelete} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-slate-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có phòng chiếu nào</h3>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Bắt đầu bằng việc tạo phòng chiếu đầu tiên cho rạp của bạn.</p>
                        <button
                            onClick={() => { setIsOpen(true); setIsCreate(null) }}
                            className="bg-white hover:bg-slate-50 text-indigo-600 font-bold py-2.5 px-8 rounded-xl border-2 border-indigo-100 transition-all duration-200 active:scale-95"
                        >
                            ➕ Tạo phòng chiếu đầu tiên
                        </button>
                    </div>
                )}
            </div>
            <Modal isOpen={isOpen} onClose={OnClose}>
                <FormTheaterRooms onSuccess={() => setIsOpen(false)} reloadData={reloadData} theaterRoomItem={isCreate} cinemaId={cinemaId} />
            </Modal>
        </div>
    )
}

