import React, { useEffect, useState } from 'react'
import { type BookingResponse, } from '../../type/typeBooking';
import { getListBookings, } from '../../services/apiBookings';
import BookingCard from '../../components/BookingCard';

export default function Bookings() {
  const [bookings, setBookings] = React.useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getListBookings();
      setBookings(res)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [])


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            📋 Danh Sách Đơn Vé
          </h1>
          <p className="text-gray-600 mt-2">Quản lý và theo dõi các vé đặt của khách hàng</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎫</div>
            <p className="text-gray-500 text-lg">Không có vé đặt nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">

                    <th className="px-6 py-4 text-left text-sm font-semibold">Mã Vé</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Mã Suất Chiếu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Tổng Tiền</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Trạng Thái</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Ngày Đặt</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Thao Tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {bookings.map((item: BookingResponse) => (
                    <BookingCard item={item} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                Tổng cộng: <span className="text-blue-600 font-bold">{bookings.length}</span> vé đặt
              </p>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}
