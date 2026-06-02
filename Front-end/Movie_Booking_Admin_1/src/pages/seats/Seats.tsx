import { useEffect, useState } from 'react'
import type { SeatResponse } from '../../type/typeSeats';
import { getListSeatsbyRoom, DeleteSeat } from '../../services/apiSeats';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import FormSeats from '../../components/FormSeats';
import SeatsCard from '../../components/SeatsCard';
import { toast } from 'react-toastify';

export default function Seats() {
  const [seats, setSeats] = useState<SeatResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [countSeats, setCountSeats] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getListSeatsbyRoom(Number(id));
      setSeats(res);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    } finally {
      setLoading(false);
    }
  }
  console.log(seats, "ssssssssssssss");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [id]);

  const handleDeleteSeat = async (seatId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ghế này không?')) {
      try {
        await DeleteSeat(Number(id), seatId);
        toast.success('Xóa ghế thành công!')
        loadData();
      } catch (error) {
        console.error('Lỗi khi xóa ghế:', error);
        alert('Không thể xóa ghế này.');
      }
    }
  };

  // const handleSuccess = () => {
  //   setIsModalOpen(false);
  //   loadData();
  // };

  // Group seats by row
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.rowLetter]) {
      acc[seat.rowLetter] = [];
    }
    acc[seat.rowLetter].push(seat);
    return acc;
  }, {} as Record<string, SeatResponse[]>);

  // Sort rows and seats within rows
  const sortedRows = Object.keys(groupedSeats).sort();
  sortedRows.forEach(row => {
    groupedSeats[row].sort((a, b) => a.seatNumber - b.seatNumber);
  });

  if (loading && seats.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">Đang tải sơ đồ ghế...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8 bg-gray-50 min-h-screen'>
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Quay lại
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            Thêm ghế
          </button>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 z-20 flex justify-center items-center rounded-2xl backdrop-blur-[2px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sơ Đồ Phòng Chiếu</h2>
            <p className="text-gray-500">Mã phòng: <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{id}</span> • Tổng số: <span className="font-semibold">{seats.length}</span> ghế</p>
          </div>

          <div className="w-full mb-20 relative">
            <div className="w-4/5 h-3 bg-gradient-to-b from-gray-400 to-gray-200 mx-auto rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative z-10"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-gray-100/50 to-transparent blur-xl -mt-4 opacity-50"></div>
            <p className="text-center mt-6 text-gray-400 text-xs uppercase tracking-[0.3em] font-bold">Màn hình</p>
          </div>

          <div className="flex flex-col gap-5 items-center overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-gray-200">
            {sortedRows.length > 0 ? (
              sortedRows.map((row) => (
                <div key={row} className="flex gap-4 items-center whitespace-nowrap">
                  {/* Row Label Left */}
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400 border border-gray-100 rounded-md bg-gray-50 text-sm">
                    {row}
                  </div>

                  <div className="flex gap-2.5">
                    {groupedSeats[row].map((seat) => {
                      // setCountSeats(countSeats + 1);
                      return (< SeatsCard seat={seat} handleDeleteSeat={() => handleDeleteSeat(seat.seatId)} />)
                    })}
                  </div>

                  <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400 border border-gray-100 rounded-md bg-gray-50 text-sm">
                    {row}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center gap-4 text-center">
                <div className="text-6xl text-gray-200">🪑</div>
                <div>
                  <p className="text-gray-500 font-bold text-xl">Chưa có dữ liệu ghế</p>
                  <p className="text-gray-400">Hãy nhấn nút "Quản lý ghế" để tạo sơ đồ cho phòng này.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 text-center">Chú thích</h4>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-indigo-500 rounded-t-lg rounded-b-sm border-b-4 border-indigo-700 shadow-sm transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Ghế Thường</span>
                  <span className="text-[10px] text-gray-400 italic">Giá tiêu chuẩn</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-amber-400 rounded-t-lg rounded-b-sm border-b-4 border-amber-600 shadow-sm transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Ghế VIP</span>
                  <span className="text-[10px] text-gray-400 italic">Trải nghiệm cao cấp</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-pink-500 rounded-t-lg rounded-b-sm border-b-4 border-pink-700 shadow-sm transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Ghế Đôi</span>
                  <span className="text-[10px] text-gray-400 italic">Dành cho cặp đôi</span>
                </div>
              </div>


            </div>
            <p className="text-center mt-6 text-[10px] text-gray-400 italic">* Mẹo: Click vào ghế bất kỳ để xóa ghế đó khỏi sơ đồ.</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Quản lý sơ đồ ghế</h3>
            <p className="text-gray-500 text-sm">Thêm một hoặc nhiều ghế vào phòng chiếu</p>
          </div>
          <FormSeats countSeat={seats.length} listSeats={groupedSeats} roomId={Number(id)} onClose={() => setIsModalOpen(false)} onSuccess={loadData} />
        </div>
      </Modal>
    </div>
  )
}
