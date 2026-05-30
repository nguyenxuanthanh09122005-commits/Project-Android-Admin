
import { useRef, useState } from 'react';
import type { BookingResponse, BookingStatusUpdateRequest } from '../type/typeBooking'
import { updateBookingStatus } from '../services/apiBookings';
import Modal from './Modal';
import DetailTicket from '../pages/bookings/DetailTicket';
export type BookingCardProps = {
    item: BookingResponse
}
export default function BookingCard(props: BookingCardProps) {
    const { item } = props;
    const [isOpen, setIsOpen] = useState(false);
    const OnClose = () => {
        setIsOpen(false);
    }
    const [updateStatus, setUpdateStatus] = useState<BookingStatusUpdateRequest>({
        status: item.status
    });
    const [loading, setLoading] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateStatus({ ...updateStatus, [name]: value });
    }

    const handleSubmit = async () => {
        if (!updateStatus.status) {
            alert('Vui lòng chọn trạng thái');
            return;
        }
        setLoading(true);
        try {
            const res = await updateBookingStatus(item.bookingId, updateStatus);
            console.log(res, "resssssssssssssssssss");

            alert('Cập nhật trạng thái thành công');

            if (buttonRef.current) {
                buttonRef.current.disabled = true;
            }
        } catch (error) {
            console.log(error);
            alert('Cập nhật trạng thái thất bại');
        } finally {
            setLoading(false);
        }
    }

    return (

        <tr
            key={item.bookingId}
            className="hover:bg-blue-50 transition-colors duration-200 ease-in-out"
        >
            <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                #{item.bookingId}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">
                {item.showtimeId}
            </td>
            <td className="px-6 py-4 text-sm font-bold text-green-600">
                {formatCurrency(item.totalAmount)}
            </td>
            <td className="px-6 py-4 text-sm">
                <select
                    name="status"
                    value={updateStatus.status}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Chọn trạng thái --</option>
                    <option value="PendingPayment">Đang thanh toán</option>
                    <option value="Paid">Đã thanh toán</option>
                    {/* <option value="Cancel">Đã hủy</option> */}
                </select>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(item.bookingDate)}
            </td>
            <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200 flex items-center gap-1 disabled:cursor-not-allowed"
                    >
                        Xem chi tiết
                    </button>
                    <button
                        disabled={updateStatus.status == item.status ? true : false}
                        ref={buttonRef}
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200 flex items-center gap-1 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                    </button>
                </div>
            </td>
            <Modal isOpen={isOpen} onClose={OnClose}>
                <DetailTicket item={item} />
            </Modal>
        </tr>

    )
}
