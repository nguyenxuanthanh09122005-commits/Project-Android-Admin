import React, { useState } from 'react'
import type { CinemaType, CinemaTypeRequest } from '../type/typeCinema'
import { CreateCinemas, EditCinemas } from '../services/cinemaAPI'
import { toast } from 'react-toastify'

interface FormCinemasProps {
    cinemaItem: CinemaType | null
    onSuccess: () => void
    reloadData: () => void
}

export default function FormCinemas({ cinemaItem, onSuccess, reloadData }: FormCinemasProps) {
    const [formData, setFormData] = useState<CinemaTypeRequest>({
        cinemaName: cinemaItem?.cinemaName || '',
        city: cinemaItem?.city || '',
        address: cinemaItem?.address || ''
    })

    const [loading, setLoading] = useState(false)



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (!formData.cinemaName || !formData.city || !formData.address) {
            alert("Vui lòng điền đầy đủ thông tin rạp chiếu");
        }

        try {
            if (cinemaItem) {
                const res = await EditCinemas(cinemaItem.cinemaId, formData);
                console.log(res, "Edit");
                toast.success('Update rạp thành công!')
            } else {
                const res = await CreateCinemas(formData);
                console.log(res, "Create");
                toast.success('Thêm rạp thành công!')
            }

            onSuccess()
            reloadData()

            if (!cinemaItem) {
                setFormData({
                    cinemaName: '',
                    city: '',
                    address: ''
                })
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 mb-4 border border-brand-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
                    {cinemaItem ? 'Chỉnh sửa rạp chiếu' : 'Thêm rạp chiếu mới'}
                </h2>
                <p className="text-zinc-500 font-medium text-sm">
                    {cinemaItem ? 'Cập nhật thông tin rạp chiếu' : 'Tạo rạp chiếu mới cho hệ thống'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cinema Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-zinc-700">
                        Tên rạp chiếu <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cinemaName"
                            value={formData.cinemaName}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: CGV Vincom Center..."
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all duration-200 text-zinc-900 font-medium placeholder-zinc-400 border-zinc-200 bg-zinc-50/50`}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-zinc-700">
                        Thành phố <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Hồ Chí Minh, Hà Nội..."
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all duration-200 text-zinc-900 font-medium placeholder-zinc-400 border-zinc-200 bg-zinc-50/50`}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-zinc-700">
                        Địa chỉ chi tiết <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                            rows={4}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all duration-200 text-zinc-900 font-medium placeholder-zinc-400 border-zinc-200 bg-zinc-50/50 resize-none`}
                            disabled={loading}
                        />
                    </div>
                    <p className="text-zinc-500 text-xs font-medium">
                        Nhập địa chỉ đầy đủ để khách hàng dễ dàng tìm đến
                    </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-8 border-t border-zinc-100 mt-4">
                    <button
                        type="button"
                        onClick={onSuccess}
                        disabled={loading}
                        className="px-6 py-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </>
                        ) : (
                            cinemaItem ? 'Cập nhật rạp chiếu' : 'Thêm mới rạp'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
