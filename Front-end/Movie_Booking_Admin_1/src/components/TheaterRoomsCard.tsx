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
            className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 transition-all duration-300 flex flex-col h-full"
        >
            <div onClick={() => navigate(`/theaterrooms/${room.roomId}/seats`)} className="cursor-pointer flex-1">
                {/* Room Header */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25V18a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V5.25Zm6.75 1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{room.roomName}</h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID: #{room.roomId}</p>
                        </div>
                    </div>
                </div>

                {/* Room Stats */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 group-hover:bg-white group-hover:ring-1 group-hover:ring-slate-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 0A2.25 2.25 0 0 1 7.5 6h9a2.25 2.25 0 0 1 2.25 2.25m-13.5 0v10.5A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V8.25M9 11.25v4.5m6-4.5v4.5" />
                            </svg>
                            <span className="text-xs font-bold text-slate-500 uppercase">Sức chứa</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">{room.totalSeats} ghế</span>
                    </div>
                    {/* Progress Bar Style Indicator */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button
                    onClick={(e) => { e.stopPropagation(); setIsOpen(); setIsCreate(room) }}
                    className="flex-1 bg-white hover:bg-amber-50 text-amber-600 border border-amber-100 font-bold py-2 rounded-xl transition-all duration-200 text-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Sửa
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(room.roomId) }}
                    className="flex-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 font-bold py-2 rounded-xl transition-all duration-200 text-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Xóa
                </button>
            </div>
        </div>
    )
}
