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
        <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors group">
            {/* Movie */}
            <td className="px-5 py-4 text-sm font-semibold text-zinc-900 group-hover:text-brand-600 transition-colors">
                {showtime.movieName}
            </td>

            {/* Cinema */}
            <td className="px-5 py-4 text-sm text-zinc-600 font-medium">
                {showtime.cinemaName}
            </td>

            {/* Room */}
            <td className="px-5 py-4 text-sm text-zinc-600">
                {showtime.roomName}
            </td>

            {/* Date */}
            <td className="px-5 py-4 text-sm text-zinc-600">
                <span className="bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {formatDate(showtime.startTime)}
                </span>
            </td>

            {/* Start Time */}
            <td className="px-5 py-4 text-sm font-medium text-emerald-600">
                {formatTime(showtime.startTime)}
            </td>

            {/* End Time */}
            <td className="px-5 py-4 text-sm font-medium text-rose-600">
                {formatTime(showtime.endTime)}
            </td>

            {/* Price */}
            <td className="px-5 py-4 text-sm font-bold text-brand-600">
                {showtime.baseTicketPrice.toLocaleString('vi-VN')}đ
            </td>

            {/* Actions */}
            <td className="px-5 py-4 text-sm flex gap-2">
                <button onClick={() => navigate(`/showtimes/${showtime.showtimeId}`)} className="px-3.5 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-sm">
                    ✏️
                </button>
                <button onClick={() => handleDelete(showtime.showtimeId)} className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-50 hover:text-rose-700 transition-all shadow-sm">
                    🗑️
                </button>
            </td>
        </tr>
    );
}
