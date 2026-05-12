import React from 'react'

export default function DetailTheaterrooms() {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Chi tiết phòng chiếu</h1>

            <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Mã phòng:</span>
                    <span className="text-sm text-gray-900">1</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Mã rạp:</span>
                    <span className="text-sm text-gray-900">101</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Tên rạp:</span>
                    <span className="text-sm text-gray-900">CGV Vincom Center</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Tên phòng:</span>
                    <span className="text-sm text-gray-900">Phòng 01</span>
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-gray-600">Tổng số ghế:</span>
                    <span className="text-sm text-gray-900">150</span>
                </div>
            </div>

            <div className="mt-6 flex space-x-3">
                <button className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Chỉnh sửa
                </button>
                <button className="flex-1 rounded-xl bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    Quay lại
                </button>
            </div>
        </div>
    )
}
