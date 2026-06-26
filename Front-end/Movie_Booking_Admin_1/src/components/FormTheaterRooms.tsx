import React, { useState } from 'react'
import type { TheaterRoomType, TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
import { CreateTheaterRooms, EditTheaterRooms } from '../services/theater_roomsAPI';
import { toast } from 'react-toastify';
import { CreateAutoSeat } from '../services/apiSeats';

export type { TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
type TheaterRoomsProps = {
    theaterRoomItem: TheaterRoomType | null,
    cinemaId: number,
    onSuccess: () => void
    reloadData: () => void
}
export default function FormTheaterRooms({ theaterRoomItem, cinemaId, onSuccess, reloadData }: TheaterRoomsProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<TheaterRoomTypeRequest>({
        cinemaId: cinemaId,
        roomName: theaterRoomItem ? theaterRoomItem.roomName : '',
        totalSeats: theaterRoomItem ? theaterRoomItem.totalSeats : 0,
        rows: (theaterRoomItem as any)?.rows || 1, // Mặc định 1 để không bị block validation
        columns: (theaterRoomItem as any)?.columns || 1
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;

        setFormData(prev => {
            const nextData = { ...prev, [name]: val };
            if (name === 'rows' || name === 'columns') {
                nextData.totalSeats = nextData.rows * nextData.columns;
            }
            return nextData;
        });
    };
    console.log(formData, "formData");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit Data:", formData);

        // Validation
        if (!formData.roomName || formData.totalSeats <= 0) {
            toast.error("Tên phòng và số ghế phải hợp lệ.");
            return;
        }

        if (formData.rows <= 0 || formData.columns <= 0) {
            toast.error("Số hàng và số cột phải lớn hơn 0.");
            return;
        }

        setLoading(true);
        try {
            if (theaterRoomItem) {
                const apiCall = await EditTheaterRooms(theaterRoomItem.roomId, formData);
                console.log(apiCall, "apiCall");
                toast.success("Cập nhật phòng chiếu thành công!");
            } else {
                const apiCall = await CreateTheaterRooms(formData);
                console.log(apiCall, "apiCall");
                if (apiCall && apiCall.roomId) {
                    try {
                        const apiGenerateSeats = await CreateAutoSeat(apiCall.roomId, { rows: formData.rows, columns: formData.columns });
                        console.log(apiGenerateSeats, "apiGenerateSeats");
                        toast.success("Thêm phòng và tự động tạo ghế thành công!");
                    } catch (seatError: any) {
                        console.error("Seat Generation Error:", seatError);
                        toast.warning("Phòng chiếu đã được tạo, nhưng không thể tự động tạo ghế. Vui lòng kiểm tra lại hoặc tạo ghế thủ công!");
                    }
                } else {
                    toast.success("Thêm phòng chiếu thành công!");
                }
            }

            onSuccess();
            reloadData();
        } catch (error: any) {
            console.error("API Error:", error);
            toast.error(error.response?.data?.message || "Lỗi khi lưu dữ liệu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {theaterRoomItem ? '✏️ Chỉnh sửa phòng chiếu' : '➕ Thêm phòng chiếu mới'}
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm">
                <input type="hidden" name="cinemaId" value={cinemaId} />

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        ID Rạp chiếu
                    </label>
                    <input

                        onChange={handleInputChange}
                        id="cinemaId"
                        name="cinemaId"
                        value={formData.cinemaId}
                        readOnly
                        type="number"
                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tên phòng
                    </label>
                    <input
                        value={formData.roomName}
                        id="roomName"
                        name="roomName"
                        type="text"
                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Nhập tên phòng"
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Số ghế
                    </label>
                    <input
                        value={formData.totalSeats}
                        onChange={handleInputChange}
                        id="totalSeats"
                        name="totalSeats"
                        type="number"
                        readOnly
                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Nhập tổng số ghế"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Số hàng
                    </label>
                    <input
                        value={formData.rows}
                        onChange={handleInputChange}
                        id="rows"
                        name="rows"
                        type="number"

                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Nhập tổng số ghế"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Số cột
                    </label>
                    <input
                        value={formData.columns}
                        onChange={handleInputChange}
                        id="columns"
                        name="columns"
                        type="number"
                        min="1"
                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Nhập số cột"
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`w-full rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >

                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang xử lý...
                        </span>
                    ) : (
                        theaterRoomItem ? "Cập nhật phòng" : "Thêm phòng"
                    )}
                </button>
            </form>
        </div>
    )
}
