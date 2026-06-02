
import { useEffect, useState } from 'react';
import type { BookingResponse, TicketDetailResponse } from '../../type/typeBooking'
import { getDetailedBooking } from '../../services/apiBookings';

export type DetailTicketProps = {
    item: BookingResponse
}

export default function DetailTicket(props: DetailTicketProps) {
    const [ticket, setTicket] = useState<BookingResponse>()
    const { item } = props;
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await getDetailedBooking(item.bookingId);
            setTicket(res);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData()
    }, [item.bookingId])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🎫 Chi Tiết Đơn Vé
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">Mã đơn:</span>
                    <span className="font-semibold text-blue-600">#{ticket?.bookingId}</span>
                </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Tổng số vé</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                            {ticket?.tickets.length || 0}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Tổng tiền</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {formatCurrency(ticket?.totalAmount || 0)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Khách hàng</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {ticket?.customerName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Phim</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {ticket?.movieTitle}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Rạp chiếu</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {ticket?.cinemaName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Trạng thái</p>
                        <p className="mt-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${ticket?.status?.toLowerCase().includes('paid')
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {ticket?.status}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Suất chiếu</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                            #{ticket?.showtimeId}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tickets List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh sách vé</h3>
                {ticket?.tickets && ticket.tickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ticket.tickets.map((ticketItem: TicketDetailResponse, index: number) => (
                            <div
                                key={ticketItem.seatId}
                                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                            >
                                {/* Seat Info */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Vé #{index + 1}
                                    </div>
                                    <span className="text-gray-400 text-sm">#ID: {ticketItem.seatId}</span>
                                </div>

                                {/* Seat Display */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-4 text-center">
                                    <p className="text-sm opacity-80 mb-2">Ghế</p>
                                    <p className="text-3xl font-bold tracking-widest">
                                        {ticketItem.rowLetter}{ticketItem.seatNumber}
                                    </p>
                                </div>

                                {/* Ticket Details */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Loại ghế</span>
                                        <span className="font-semibold text-gray-900">
                                            {ticketItem.seatType}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Giá</span>
                                        <span className="font-bold text-green-600 text-lg">
                                            {formatCurrency(ticketItem.purchasePrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <p className="text-gray-500">Không có vé nào</p>
                    </div>
                )}
            </div>
        </div>
    )
}
