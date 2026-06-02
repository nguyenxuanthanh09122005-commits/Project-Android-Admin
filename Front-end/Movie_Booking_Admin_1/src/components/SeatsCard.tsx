import type { SeatResponse } from '../type/typeSeats'

export type SeatCardProps = {
    roomId: number,
    seat: SeatResponse,
    handleDeleteSeat?: (id: number) => void,
    onSeatClick?: () => void
}

export default function SeatsCard(props: SeatCardProps) {
    const { seat } = props;

    // Xác định màu sắc dựa trên loại ghế và trạng thái
    const getSeatStyles = () => {
        if (seat.status === 'DISABLED') {
            return 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed';
        }

        switch (seat.seatType) {
            case 'VIP':
                return 'bg-amber-400 text-white border-amber-600 hover:bg-amber-500 hover:border-amber-700';
            case 'COUPLE':
                return 'bg-pink-500 text-white border-pink-700 hover:bg-pink-600 hover:border-pink-800';
            default:
                return 'bg-indigo-500 text-white border-indigo-700 hover:bg-indigo-600 hover:border-indigo-800';
        }
    };

    return (
        <div
            key={seat.seatId}
            title={`Ghế ${seat.rowLetter}${seat.seatNumber} (${seat.seatType}) - ${seat.status === 'ACTIVE' ? 'Hoạt động' : 'Hỏng/Bảo trì'} - Click để chỉnh sửa`}
            onClick={() => props.onSeatClick?.()}
            className={`
                w-9 h-9 md:w-11 md:h-11 
                rounded-t-xl rounded-b-md
                flex items-center justify-center 
                text-[10px] md:text-xs font-bold cursor-pointer transition-all duration-300
                shadow-sm border-b-4
                ${getSeatStyles()}
                hover:-translate-y-1 hover:shadow-md active:scale-95
            `}
        >
            {seat.seatNumber}
        </div>
    )
}
