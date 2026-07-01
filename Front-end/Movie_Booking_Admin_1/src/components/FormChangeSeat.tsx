import React, { useState } from 'react';
import type { SeatResponse } from '../type/typeSeats';
import { UpdateSeatType, UpdateSeatStatus } from '../services/apiSeats';
import { toast } from 'react-toastify';

export type FormChangeSeatProps = {
    seat: SeatResponse;
    roomId: number;
    onClose: () => void;
    onSuccess: () => void;
    handleDeleteSeat: (id: number) => void;
};

export default function FormChangeSeat({ seat, roomId, onClose, onSuccess, handleDeleteSeat }: FormChangeSeatProps) {
    const [loading, setLoading] = useState(false);
    const [seatType, setSeatType] = useState<SeatResponse['seatType']>(seat.seatType);
    const [status, setStatus] = useState<SeatResponse['status']>(seat.status);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update Type if changed
            if (seatType !== seat.seatType) {
                const res = await UpdateSeatType(roomId, seat.seatId, seatType);
                console.log(res);
            }
            // Update Status if changed
            if (status !== seat.status) {
                const res = await UpdateSeatStatus(roomId, seat.seatId, status);
                console.log(res);
            }
            toast.success('Cập nhật ghế thành công!');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật ghế:', error);
            toast.error('Có lỗi xảy ra khi cập nhật ghế');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-5 text-left p-2">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Vị trí ghế</label>
                    <div className="bg-gray-100 p-3 rounded-xl font-bold text-gray-700">
                        Hàng {seat.rowLetter} - Ghế số {seat.seatNumber}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Loại ghế</label>
                    <select
                        value={seatType}
                        onChange={(e) => setSeatType(e.target.value as SeatResponse['seatType'])}
                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                    >
                        <option value="NORMAL">Ghế Thường</option>
                        <option value="VIP">Ghế VIP</option>
                        <option value="COUPLE">Ghế Đôi</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as SeatResponse['status'])}
                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                    >
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="DISABLED">Bảo trì/Hỏng</option>
                    </select>
                </div>
                <div className="flex flex-row gap-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 mt-6 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form >
            <button
                type="button"
                onClick={async () => {
                    await handleDeleteSeat(seat.seatId);
                    onClose();
                }}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 mt-2 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                    }`}
            >
                Xóa ghế
            </button>
        </div>
    );
}
