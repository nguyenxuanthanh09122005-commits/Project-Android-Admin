import React, { useState } from 'react'
import type { TheaterRoomType } from '../type/typeTheaterRooms';

import Modal from './Modal';
import FormTheaterRooms from './FormTheaterRooms';
import type { CinemaType } from '../type/typeCinema';

interface ListTheater_RoomsProps {
    rooms: TheaterRoomType[];
    cinemaId: number;
    loading?: boolean;
    // onAddRoom?: () => void;
    // onEditRoom?: (roomId: number) => void;
    // onDeleteRoom?: (roomId: number) => void;
}

export default function ListTheater_Rooms({
    rooms,
    cinemaId,
    loading = false,
    // onAddRoom,
    // onEditRoom,
    // onDeleteRoom
}: ListTheater_RoomsProps) {
    const [roomLoading, setRoomLoading] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState<TheaterRoomType | null>(null);
    console.log(cinemaId, "cinemaID");

    const OnClose = () => {
        setIsOpen(false);
    }






    // const handleAddRoom = async () => {
    //     setRoomLoading(true);
    //     try {
    //         const res = await CreateTheaterRooms();
    //     } catch (error) {
    //         console.error("Error adding room:", error);
    //     } finally {
    //         setRoomLoading(false);
    //     }
    //     console.log("Add room for cinema ID:", cinemaId);
    // }


    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">🎪</span>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Phòng Chiếu</h2>
                            <p className="text-purple-100 text-sm">{rooms.length} phòng</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setIsOpen(true); setIsCreate(null) }}
                        className="bg-white hover:bg-purple-50 text-purple-600 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        ➕ Thêm phòng
                    </button>
                </div>
            </div>

            {/* Rooms Content */}
            <div className="p-8">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    </div>
                ) : rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <div
                                key={room.roomId}
                                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Room Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{room.roomName}</h3>
                                        <p className="text-sm text-gray-500">Phòng ID: {room.roomId}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700`}
                                    >

                                    </span>
                                </div>

                                {/* Room Info */}
                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <span className="text-2xl">🪑</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Sức chứa</p>
                                            <p className="text-lg font-semibold">{room.totalSeats} ghế</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setIsOpen(true); setIsCreate(room) }}
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                                    >
                                        ✏️ Sửa
                                    </button>
                                    <button
                                        // onClick={() => onDeleteRoom?.(room.roomId)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                                    >
                                        🗑️ Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-300 text-6xl mb-4">🎪</div>
                        <p className="text-gray-500 text-lg mb-6">Chưa có phòng chiếu nào</p>
                        <button
                            // onClick={handleAddRoom}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                        >
                            ➕ Tạo phòng chiếu đầu tiên
                        </button>
                    </div>
                )}
            </div>
            <Modal isOpen={isOpen} onClose={OnClose}>
                <FormTheaterRooms cinemaId={cinemaId} />
            </Modal>
        </div>
    )
}

