import type { SeatResponse } from '../type/typeSeats'
export type SeatCardProps = {
    seat: SeatResponse,
    handleDeleteSeat: (id: number) => void,

}
export default function SeatsCard(props: SeatCardProps) {
    const { seat, handleDeleteSeat } = props;
    return (
        <div
            key={seat.seatId}
            title={`Ghế ${seat.rowLetter}${seat.seatNumber} (${seat.seatType}) - Click để xóa`}
            onClick={() => handleDeleteSeat(seat.seatId)}
            className={`
                          w-9 h-9 md:w-11 md:h-11 
                          rounded-t-xl rounded-b-md
                          flex items-center justify-center 
                          text-[10px] md:text-xs font-bold cursor-pointer transition-all duration-300
                          shadow-sm border-b-4
                          ${seat.seatType === 'VIP'
                    ? 'bg-amber-400 text-white border-amber-600 hover:bg-red-500 hover:border-red-700'
                    : 'bg-indigo-500 text-white border-indigo-700 hover:bg-red-500 hover:border-red-700'
                }
                          hover:-translate-y-1 hover:shadow-md active:scale-95
                        `}
        >
            {seat.seatNumber}
        </div>
    )
}
