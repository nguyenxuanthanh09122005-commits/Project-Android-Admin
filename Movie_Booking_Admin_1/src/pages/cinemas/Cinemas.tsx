import { useEffect, useState } from 'react'
import type { CinemaType } from '../../type/typeCinema'
import { api } from '../../services/api'
import CinemaCard from '../../components/CinemaCard'
import Modal from '../../components/Modal'
import FormCinemas from '../../components/FormCinemas'

import { DeleteCinemas } from '../../services/cinemaAPI'


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
        } catch (error) {
            console.log(error);
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

                {/* Cinemas Grid */}
                {cinemas.length > 0 ? (
                    <div className="space-y-10">
                        {cityNames.map((city) => (
                            <section key={city} className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-slate-900">{city}</h2>
                                        <p className="text-sm text-slate-500">{groupedCinemas[city].length} rạp chiếu</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                                        <span>📌</span>
                                        <span>City group</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
