import { useEffect, useState } from 'react'
import type { CinemaType } from '../../type/typeCinema'
import { api } from '../../services/api'
import CinemaCard from '../../components/CinemaCard'
import Modal from '../../components/Modal'
import FormCinemas from '../../components/FormCinemas'

import { DeleteCinemas } from '../../services/cinemaAPI'
import { toast } from 'react-toastify'


export default function Cinemas() {
    const [cinemas, setCinemas] = useState<CinemaType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    console.log(loading);
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState<CinemaType | null>(null);
    console.log(isCreate);
    const fetchCinemas = async () => {
        try {
            setLoading(true)
            const response = await api.get('/admin/cinemas')
            setCinemas(response.data)
            setError(null)
        } catch (err: unknown) {
            setError('Lỗi tải dữ liệu rạp chiếu')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCinemas()
    }, [])

    const groupedCinemas = cinemas.reduce<Record<string, CinemaType[]>>((groups, cinema) => {
        const city = cinema.city || 'Không xác định'
        if (!groups[city]) {
            groups[city] = []
        }
        groups[city].push(cinema)
        return groups
    }, {})

    const cityNames = Object.keys(groupedCinemas).sort((a, b) => a.localeCompare(b, 'vi'))

    const OnClose = () => {
        setIsOpen(false);
    }
    // const DisplayEdit = (id: number) => {
    //     setIsOpen(true);
    //     console.log(id);

    // }
    const handleDelete = async (id: number) => {
        try {
            const response = await DeleteCinemas(id);
            console.log(response, "delete cinema");
            toast.success('Xóa rạp thành công!')
        } catch (error: any) {
            console.error("Delete Error:", error);
            toast.error(error.response?.data?.message || 'Xóa rạp thất bại! Rạp chiếu này có thể đang có phòng chiếu hoặc lịch chiếu liên kết.');
        } finally {
            fetchCinemas();
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🎬 Quản lý Rạp Chiếu
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Tổng số rạp: <span className="font-semibold text-blue-600">{cinemas.length}</span>
                    </p>
                    <div className='flex flex-row-reverse w-full'>
                        <button className='rounded-[5px] font-semibold  bg-blue-400 text-white px-[10px] py-[15px]' onClick={() => { setIsOpen(true); setIsCreate(null) }}>Thêm mới</button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Cinemas List */}
                {cinemas.length > 0 ? (
                    <div className="space-y-12">
                        {cityNames.map((city) => (
                            <section key={city} className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
                                        🏙️
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{city}</h2>
                                        <p className="text-sm font-medium text-slate-500">
                                            Khu vực có <span className="text-indigo-600 font-bold">{groupedCinemas[city].length}</span> rạp đang hoạt động
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {groupedCinemas[city].map((cinema) => (
                                        <CinemaCard
                                            key={cinema.cinemaId}
                                            cinema={cinema}
                                            handleDelete={() => handleDelete(cinema.cinemaId)}
                                            handleEdit={() => setIsCreate(cinema)}
                                            handleIsOpen={() => setIsOpen(true)}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎬</div>
                        <p className="text-gray-500 text-xl">Không có dữ liệu rạp chiếu</p>
                    </div>
                )}
            </div>
            <Modal isOpen={isOpen} onClose={OnClose}>

                <FormCinemas cinemaItem={isCreate} onSuccess={() => setIsOpen(false)} reloadData={fetchCinemas} />
            </Modal>
        </div>
    )
}
