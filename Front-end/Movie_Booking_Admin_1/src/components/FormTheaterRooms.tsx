import React, { useState } from 'react'
import type { TheaterRoomType, TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
import { CreateTheaterRooms, EditTheaterRooms } from '../services/theater_roomsAPI';

export type { TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
type TheaterRoomsProps = {
    theaterRoomItem: TheaterRoomType | null,
    cinemaId: number,
    onSuccess: () => void
    reloadData: () => void
}
export default function FormTheaterRooms({ theaterRoomItem, cinemaId, onSuccess, reloadData }: TheaterRoomsProps) {
    const [formData, setFormData] = useState<TheaterRoomTypeRequest>({
        cinemaId: cinemaId,
        roomName: theaterRoomItem ? theaterRoomItem.roomName : '',
        totalSeats: theaterRoomItem ? theaterRoomItem.totalSeats : 0
    })
    const [loading, setLoading] = useState(false);
    console.log(loading);

    console.log(cinemaId, "cineeeee");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            if (!formData.roomName || formData.totalSeats <= 0) {
                alert("Vui lòng điền đầy đủ thông tin và đảm bảo số ghế lớn hơn 0.");
            }
            if (theaterRoomItem) {
                const res = await EditTheaterRooms(theaterRoomItem.roomId, formData);
                console.log(res, "Edit response");


            } else {
                const res = await CreateTheaterRooms(formData);
                console.log(res, "Create response");

            }
            onSuccess();
            reloadData();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {theaterRoomItem ? '✏️ Chỉnh sửa phòng chiếu' : '➕ Thêm phòng chiếu mới'}
                </h2>

            </div>
            <form className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm">
                <input type="hidden" name="cinemaId" value="1" />

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
                        min="1"
                        required
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Nhập tổng số ghế"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {theaterRoomItem ? "Cập nhật phòng" : "Thêm phòng"}
                </button>
            </form>
        </div>
    )
}
