import React, { useState } from 'react';
import type { SeatResponse, SeatRequest, SeatBulkRequest } from '../type/typeSeats'
import { CreateSeat, CreateListSeats } from '../services/apiSeats';

export type FormSeatsProps = {
    listSeats: Record<string, SeatResponse[]>,
    roomId: number,
    onClose: () => void,
    onSuccess: () => void
}

export default function FormSeats({ listSeats, roomId, onClose, onSuccess }: FormSeatsProps) {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'single' | 'batch'>('batch');

    // Batch form state
    const [totalQuantity, setTotalQuantity] = useState(10);
    const [seatsPerRow, setSeatsPerRow] = useState(10);
    const [batchSeatType, setBatchSeatType] = useState('NORMAL');

    // Single form state logic
    const rows = Object.keys(listSeats).sort();
    let nextRow = 'A';
    let nextNumber = 1;

    if (rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        const seatsInLastRow = listSeats[lastRow];
        if (seatsInLastRow.length >= seatsPerRow) {
            nextRow = String.fromCharCode(lastRow.charCodeAt(0) + 1);
            nextNumber = 1;
        } else {
            nextRow = lastRow;
            nextNumber = Math.max(...seatsInLastRow.map(s => s.seatNumber), 0) + 1;
        }
    }

    const [singleData, setSingleData] = useState({
        rowLetter: nextRow,
        seatNumber: nextNumber,
        seatType: 'NORMAL'
    });

    const handleSingleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await CreateSeat(roomId, singleData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert('Lỗi khi thêm ghế');
        } finally {
            setLoading(false);
        }
    }

    const handleBatchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (totalQuantity <= 0) {
            alert('Vui lòng nhập số lượng ghế hợp lệ');
            return;
        }

        setLoading(true);

        try {
            const seats: SeatRequest[] = [];
            let remaining = totalQuantity;

            const sortedRows = Object.keys(listSeats).sort();
            let currentRowChar = 'A';
            let currentSeatNum = 1;

            if (sortedRows.length > 0) {
                const lastRowChar = sortedRows[sortedRows.length - 1];
                const lastRowSeats = listSeats[lastRowChar];
                const maxSeatInLastRow = lastRowSeats.length > 0 ? Math.max(...lastRowSeats.map(s => s.seatNumber)) : 0;

                if (maxSeatInLastRow < seatsPerRow) {
                    // Start filling from the current last row
                    currentRowChar = lastRowChar;
                    currentSeatNum = maxSeatInLastRow + 1;
                } else {
                    // Start from a new row
                    currentRowChar = String.fromCharCode(lastRowChar.charCodeAt(0) + 1);
                    currentSeatNum = 1;
                }
            }

            while (remaining > 0) {
                const existingRowSeats = listSeats[currentRowChar] || [];
                const isSeatTaken = existingRowSeats.some(s => s.seatNumber === currentSeatNum);

                if (!isSeatTaken) {
                    seats.push({
                        rowLetter: currentRowChar,
                        seatNumber: currentSeatNum,
                        seatType: batchSeatType
                    });
                    remaining--;
                }
                currentSeatNum++;

                if (currentSeatNum > seatsPerRow) {
                    currentRowChar = String.fromCharCode(currentRowChar.charCodeAt(0) + 1);
                    currentSeatNum = 1;
                }

                if (currentRowChar.charCodeAt(0) > 'Z'.charCodeAt(0) + 20) break;
            }
            const payload: SeatBulkRequest = { seats };
            await CreateListSeats(roomId, payload);
            alert(`Đã thêm thành công ${seats.length} ghế!`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Lỗi khi thêm ghế hàng loạt:', error);
            alert('Có lỗi xảy ra khi thêm ghế');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button
                    type="button"
                    onClick={() => setMode('batch')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'batch' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Thêm hàng loạt
                </button>
                <button
                    type="button"
                    onClick={() => setMode('single')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'single' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Thêm lẻ
                </button>
            </div>

            {mode === 'batch' ? (
                <form onSubmit={handleBatchSubmit} className="space-y-5 text-left">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Tổng số ghế muốn thêm</label>
                        <input
                            type="number"
                            min={1}
                            value={totalQuantity}
                            onChange={(e) => setTotalQuantity(Number(e.target.value))}
                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                            placeholder="Ví dụ: 50"
                            required
                        />
                        <p className="mt-2 text-[11px] text-gray-400 italic ml-1">Hệ thống sẽ tự động tính toán số hàng dựa trên cấu hình bên dưới.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Số ghế mỗi hàng</label>
                        <input
                            type="number"
                            min={1}
                            value={seatsPerRow}
                            onChange={(e) => setSeatsPerRow(Number(e.target.value))}
                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Loại ghế áp dụng</label>
                        <select
                            value={batchSeatType}
                            onChange={(e) => setBatchSeatType(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                        >
                            <option value="NORMAL">Ghế Thường</option>
                            <option value="VIP">Ghế VIP</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 mt-6 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        {loading ? 'Đang khởi tạo...' : 'Tự động tạo sơ đồ'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSingleSubmit} className="space-y-5 text-left">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Hàng</label>
                            <input
                                type="text"
                                maxLength={1}
                                value={singleData.rowLetter}
                                onChange={(e) => setSingleData({ ...singleData, rowLetter: e.target.value.toUpperCase() })}
                                className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Số ghế</label>
                            <input
                                type="number"
                                min={1}
                                value={singleData.seatNumber}
                                onChange={(e) => setSingleData({ ...singleData, seatNumber: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Loại ghế</label>
                        <select
                            value={singleData.seatType}
                            onChange={(e) => setSingleData({ ...singleData, seatType: e.target.value })}
                            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                        >
                            <option value="NORMAL">Ghế Thường</option>
                            <option value="VIP">Ghế VIP</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 mt-6 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        {loading ? 'Đang thêm...' : 'Thêm ghế này'}
                    </button>
                </form>
            )}
        </div>
    );
}
