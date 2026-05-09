import React, { useState } from 'react'
import type { TheaterRoomType } from '../type/typeTheaterRooms';

import Modal from './Modal';
import FormTheaterRooms from './FormTheaterRooms';
import { DeleteTheaterRooms } from '../services/theater_roomsAPI';
import TheaterRoomsCard from './TheaterRoomsCard';


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
    console.log(cinemaId, "cinemaID");

    const OnClose = () => {
        setIsOpen(false);
    }
    const handleDelete = async (roomId: number) => {
        const res = await DeleteTheaterRooms(roomId);
        console.log(res);
        reloadData();

    };
    const handleIsCreate = (room: TheaterRoomType | null) => {
        setIsCreate(room);

    }
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
                            <TheaterRoomsCard key={room.roomId} room={room} setIsOpen={() => setIsOpen(true)} setIsCreate={() => handleIsCreate(room)} handleDelete={handleDelete} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-300 text-6xl mb-4">🎪</div>
                        <p className="text-gray-500 text-lg mb-6">Chưa có phòng chiếu nào</p>
                        <button
                            onClick={() => { setIsOpen(true); setIsCreate(null) }}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
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

