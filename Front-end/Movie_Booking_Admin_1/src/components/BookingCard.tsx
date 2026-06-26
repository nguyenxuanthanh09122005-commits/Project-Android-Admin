
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
            className="border-b border-zinc-100 hover:bg-brand-50/30 transition-colors duration-200 ease-in-out group"
        >
            <td className="px-5 py-4 text-sm font-bold text-brand-600">
                #{item.bookingId}
            </td>
            <td className="px-5 py-4 text-sm text-zinc-600 font-medium">
                ST-{item.showtimeId}
            </td>
            <td className="px-5 py-4 text-sm font-bold text-emerald-600">
                {formatCurrency(item.totalAmount)}
            </td>
            <td className="px-5 py-4 text-sm">
                <select
                    name="status"
                    value={updateStatus.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow appearance-none cursor-pointer"
                >
                    <option value="">-- Chọn trạng thái --</option>
                    <option value="PendingPayment">Đang thanh toán</option>
                    <option value="Paid">Đã thanh toán</option>
                    {/* <option value="Cancel">Đã hủy</option> */}
                </select>
            </td>
            <td className="px-5 py-4 text-sm text-zinc-500">
                {formatDate(item.bookingDate)}
            </td>
            <td className="px-5 py-4 text-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Chi tiết
                    </button>
                    <button
                        disabled={updateStatus.status == item.status ? true : false}
                        ref={buttonRef}
                        onClick={handleSubmit}
                        className="bg-brand-600 hover:bg-brand-700 disabled:bg-zinc-300 disabled:text-zinc-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Đang xử lý...' : 'Cập nhật'}
                    </button>
                </div>
            </td>
            <Modal isOpen={isOpen} onClose={OnClose}>
                <DetailTicket item={item} />
            </Modal>
        </tr>
    )
}
