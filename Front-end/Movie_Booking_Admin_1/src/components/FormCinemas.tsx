import React, { useState } from 'react'
import type { CinemaType, CinemaTypeRequest } from '../type/typeCinema'
import { CreateCinemas, EditCinemas } from '../services/cinemaAPI'

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
            } else {
                const res = await CreateCinemas(formData);
                console.log(res, "Create");
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {cinemaItem ? '✏️ Chỉnh sửa rạp chiếu' : '➕ Thêm rạp chiếu mới'}
                </h2>
                <p className="text-gray-600">
                    {cinemaItem ? 'Cập nhật thông tin rạp chiếu' : 'Tạo rạp chiếu mới cho hệ thống'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cinema Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Tên rạp chiếu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cinemaName"
                            value={formData.cinemaName}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: CGV Vincom Center, Galaxy Nguyễn Du..."
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400
                                 border-gray-300 bg-white
                                }`}
                            disabled={loading}
                        />
                        <span className="absolute right-3 top-3 text-gray-400">🎬</span>
                    </div>

                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Thành phố <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Hồ Chí Minh, Hà Nội, Đà Nẵng..."
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 border-gray-300 bg-white }`}
                            disabled={loading}
                        />
                        <span className="absolute right-3 top-3 text-gray-400">📍</span>
                    </div>

                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Địa chỉ chi tiết <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                            rows={4}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none  border-gray-300 bg-white
                                }`}
                            disabled={loading}
                        />
                        <span className="absolute right-3 top-3 text-gray-400">🏢</span>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Nhập địa chỉ đầy đủ để khách hàng dễ dàng tìm đến
                    </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <span>{cinemaItem ? '💾' : '➕'}</span>
                                {cinemaItem ? 'Cập nhật' : 'Thêm mới'}
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onSuccess}
                        disabled={loading}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    )
}
