import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom';
import type { ShowTimesResponse } from '../../type/typeShowTimes';
import { DeleteShowTimes, getListShowTimes } from '../../services/apiShowTimes';
import ShowTimesCard from '../../components/ShowTimesCard';
import FilterShowTimes from '../../components/FilterShowTimes';
import Modal from '../../components/Modal';
import FormShowTimes from '../../components/FormShowTimes';
import { toast } from 'react-toastify';

export default function ShowTimes() {
  const [showTimes, setShowTimes] = useState<ShowTimesResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [ShowTimesEdited, setShowTimesEdited] = useState<ShowTimesResponse | null>(null);
  console.log(ShowTimesEdited, "ShowTimesEdited");

  const fetchShowTimes = async () => {
    try {
      setLoading(true);
      const data = await getListShowTimes();
      setShowTimes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load showtimes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(showTimes, "listSuatchieu");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchShowTimes();
  }, []);
  const handleDelete = async (id: number) => {
    const res = await DeleteShowTimes(Number(id));
    toast.success("Xóa thành công !");
    console.log(res);
    await fetchShowTimes();

  }
  // Filter dữ liệu dựa trên URL params
  const filteredShowTimes = useMemo(() => {
    const movieName = searchParams.get('movieName') || '';
    const cinemaName = searchParams.get('cinemaName') || '';
    const startTime = searchParams.get('startTime') || '';
    const chooseDate = searchParams.get('chooseDate') || '';
    // const page = Number(searchParams.get('page')) || 1;
    // const pageSize = Number(searchParams.get('pageSize')) || 15;
    return showTimes.filter((showtime) => {
      const movieMatch = !movieName || showtime.movieName === movieName;
      const cinemaMatch = !cinemaName || showtime.cinemaName === cinemaName;
      const chooseDateMatch = !chooseDate || new Date(showtime.startTime).toDateString() === new Date(chooseDate).toDateString();

      const timeString = new Date(showtime.startTime).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const timeMatch = !startTime || timeString === startTime;

      return movieMatch && cinemaMatch && chooseDateMatch && timeMatch;
    });
  }, [showTimes, searchParams]);

  console.log(searchParams.get('startTime'), "");


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải suất chiếu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <button
            onClick={fetchShowTimes}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quản lý Suất Chiếu</h1>
            <p className="text-gray-600">Tổng cộng: <span className="font-semibold text-blue-600">{showTimes.length}</span> suất chiếu | Kết quả: <span className="font-semibold text-blue-600">{filteredShowTimes.length}</span></p>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => { setIsOpen(true); setShowTimesEdited(null) }}
          >
            Thêm mới
          </button>
        </div>
        {/* Filter */}
        <FilterShowTimes showTimes={showTimes} />
        {/* Content */}
        {filteredShowTimes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">Không có suất chiếu nào khớp với bộ lọc</p>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">🎬 Phim</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">🎪 Rạp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">🚪 Phòng</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">📅 Ngày</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">🕐 Bắt đầu</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">⏱️ Kết thúc</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">💰 Giá vé</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">⚙️ Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShowTimes.map((showtime) => (
                    <ShowTimesCard key={showtime.showtimeId} showtime={showtime} handleDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="flex items-center justify-end gap-5 p-4">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
                Prev
              </button>
              <div></div>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
                Next
              </button>
            </div> */}
          </div>

        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
        <FormShowTimes reload={fetchShowTimes} onClose={() => setIsOpen(false)} showtimeEdited={null} />
      </Modal>
    </div>
  );
}
