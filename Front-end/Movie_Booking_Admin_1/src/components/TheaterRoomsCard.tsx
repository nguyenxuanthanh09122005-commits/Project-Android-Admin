import React from 'react'
import type { TheaterRoomType } from '../type/typeTheaterRooms';
import { useNavigate } from 'react-router-dom';
export type TheaterRoomsCardProps = {
    room: TheaterRoomType,
    setIsOpen: () => void,
    setIsCreate: (room: TheaterRoomType | null) => void,
    handleDelete: (roomId: number) => void
}

export default function TheaterRoomsCard({ room, setIsOpen, setIsCreate, handleDelete }: TheaterRoomsCardProps) {
    const navigate = useNavigate();
    return (
        <div
            key={room.roomId}
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
            <div onClick={() => navigate(`/theaterrooms/${room.roomId}/seats`)} className="cursor-pointer">
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
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setIsOpen(); setIsCreate(room) }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                >
                    ✏️ Sửa
                </button>
                <button
                    onClick={() => handleDelete(room.roomId)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                >
                    🗑️ Xóa
                </button>
            </div>
        </div>
    )
}
