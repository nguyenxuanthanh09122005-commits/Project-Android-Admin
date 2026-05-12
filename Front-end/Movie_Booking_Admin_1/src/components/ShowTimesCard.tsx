import { useNavigate } from 'react-router-dom';
import type { ShowTimesResponse } from '../type/typeShowTimes'

export type ShowTimesCardProps = {
    showtime: ShowTimesResponse,
    handleDelete: (id: number) => void
}

export default function ShowTimesCard(props: ShowTimesCardProps) {
    const { showtime, handleDelete } = props;
    const navigate = useNavigate();
    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const formatTime = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };


    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
            {/* Movie */}

            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {showtime.movieName}
            </td>

            {/* Cinema */}
            <td className="px-4 py-3 text-sm text-gray-700">
                {showtime.cinemaName}
            </td>

            {/* Room */}
            <td className="px-4 py-3 text-sm text-gray-700">
                {showtime.roomName}
            </td>

            {/* Date */}
            <td className="px-4 py-3 text-sm text-gray-700">
                {formatDate(showtime.startTime)}
            </td>

            {/* Start Time */}
            <td className="px-4 py-3 text-sm text-gray-700">
                {formatTime(showtime.startTime)}
            </td>

            {/* End Time */}
            <td className="px-4 py-3 text-sm text-gray-700">
                {formatTime(showtime.endTime)}
            </td>

            {/* Price */}
            <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                {showtime.baseTicketPrice.toLocaleString('vi-VN')}đ
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-sm flex gap-2">
                <button onClick={() => navigate(`/showtimes/${showtime.showtimeId}`)} className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 transition">
                    ✏️ Chi tiết
                </button>

                <button onClick={() => handleDelete(showtime.showtimeId)} className="px-3 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition">
                    🗑️ Xóa
                </button>
            </td>
        </tr>
    );
}
