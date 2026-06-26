import React, { useEffect, useState } from 'react';
import { getListBookings } from '../../services/apiBookings';
import type { BookingResponse } from '../../type/typeBooking';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line,
    PieChart, Pie, Cell
} from 'recharts';

export default function Statistic() {
    const [bookings, setBookings] = useState<BookingResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await getListBookings();
                // Check if res is array. If not, maybe res.data
                if (Array.isArray(res)) {
                    setBookings(res);
                } else if (res && Array.isArray(res.data)) {
                    setBookings(res.data);
                } else {
                    setBookings([]);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-brand-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-zinc-500 font-medium">Đang tải dữ liệu thống kê...</p>
                </div>
            </div>
        );
    }

    // Process data
    const paidBookings = bookings.filter(b => b.status === 'Paid');
    const currentYear = new Date().getFullYear();

    // 1. Doanh thu theo năm
    const revenueByYearMap: Record<string, number> = {};
    paidBookings.forEach(b => {
        if (!b.bookingDate) return;
        const year = new Date(b.bookingDate).getFullYear().toString();
        revenueByYearMap[year] = (revenueByYearMap[year] || 0) + b.totalAmount;
    });
    const revenueByYear = Object.keys(revenueByYearMap).map(year => ({
        name: year,
        total: revenueByYearMap[year]
    })).sort((a, b) => a.name.localeCompare(b.name));

    // 2. Doanh thu theo quý (của năm hiện tại)
    const revenueByQuarterMap: Record<string, number> = {
        'Q1': 0, 'Q2': 0, 'Q3': 0, 'Q4': 0
    };
    paidBookings.forEach(b => {
        if (!b.bookingDate) return;
        const date = new Date(b.bookingDate);
        if (date.getFullYear() === currentYear) {
            const month = date.getMonth(); // 0-11
            const quarter = Math.floor(month / 3) + 1;
            revenueByQuarterMap[`Q${quarter}`] += b.totalAmount;
        }
    });
    const revenueByQuarter = Object.keys(revenueByQuarterMap).map(q => ({
        name: q,
        total: revenueByQuarterMap[q]
    }));

    // 3. Top 5 phim bán chạy nhất (dựa trên doanh thu)
    const movieRevenueMap: Record<string, number> = {};
    paidBookings.forEach(b => {
        const title = b.movieTitle || 'Không rõ';
        movieRevenueMap[title] = (movieRevenueMap[title] || 0) + b.totalAmount;
    });
    const topMovies = Object.keys(movieRevenueMap)
        .map(title => ({ name: title, value: movieRevenueMap[title] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    // 4. Doanh thu theo tháng (Năm hiện tại)
    const revenueByMonthMap: Record<string, number> = {};
    for (let i = 1; i <= 12; i++) revenueByMonthMap[`T${i}`] = 0;

    paidBookings.forEach(b => {
        if (!b.bookingDate) return;
        const date = new Date(b.bookingDate);
        if (date.getFullYear() === currentYear) {
            const month = date.getMonth() + 1;
            revenueByMonthMap[`T${month}`] += b.totalAmount;
        }
    });

    const monthlyData = Object.keys(revenueByMonthMap).map((m) => ({
        name: m,
        revenue: revenueByMonthMap[m]
    }));

    const COLORS = ['#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">Thống Kê Doanh Số</h2>
                <p className="text-zinc-500 text-sm font-medium">Báo cáo tổng quan về doanh thu và phim bán chạy nhất</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Tổng doanh thu</p>
                        <h3 className="text-2xl font-bold text-zinc-900 mt-1">{formatCurrency(paidBookings.reduce((sum, b) => sum + b.totalAmount, 0))}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Vé đã bán</p>
                        <h3 className="text-2xl font-bold text-zinc-900 mt-1">{paidBookings.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-3.75C20.504 8.25 21 8.754 21 9.375v1.5m-2.625 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 9.375C18 8.754 18.504 8.25 19.125 8.25m-1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 9.375v-1.5M7.125 19.5h9.75c.621 0 1.125-.504 1.125-1.125m-1.125 2.625h1.5M18 18.375A1.125 1.125 0 0019.125 19.5m-1.125-2.625c.621 0 1.125-.504 1.125-1.125v-1.5M18 18.375C18 18.996 18.504 19.5 19.125 19.5m-1.125-2.625h1.5m-1.5 0c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125m1.125 2.625h-1.5m1.5 0C5.496 19.5 5 18.996 5 18.375M5 18.375a1.125 1.125 0 001.125-1.125m-1.125 1.125h-1.5m1.5-2.625C5 15.129 4.496 14.625 3.875 14.625h-1.5m2.625 0v1.5c0 .621-.504 1.125-1.125 1.125" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Phim đang chiếu</p>
                        <h3 className="text-2xl font-bold text-zinc-900 mt-1">{Object.keys(movieRevenueMap).length}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Doanh thu theo tháng */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm lg:col-span-2">
                    <h3 className="text-lg font-bold text-zinc-800 mb-6 tracking-tight">Thống Kê Doanh Thu Theo Tháng ({currentYear})</h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />

                                <YAxis
                                    tickFormatter={(value) => `${value / 1000000}M`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12 }}
                                />

                                <Tooltip
                                    cursor={{ fill: '#f4f4f5' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [formatCurrency(Number(value)), 'Doanh thu']}
                                />

                                <Bar dataKey="revenue" name="Doanh thu" barSize={40} fill="#f59e0b" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Doanh thu theo Quý */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-800 mb-6 tracking-tight">Doanh thu theo Quý ({currentYear})</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByQuarter} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                                <YAxis
                                    tickFormatter={(value) => `${value / 1000000}M`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f4f4f5' }}
                                    formatter={(value: any) => [formatCurrency(Number(value)), 'Doanh thu']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="total" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 3: Top 5 Phim */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-zinc-800 mb-2 tracking-tight">Top 5 Phim Bán Chạy Nhất</h3>
                    <div className="h-[300px] w-full flex-1">
                        {topMovies.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={topMovies}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {topMovies.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any) => formatCurrency(Number(value))}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                        wrapperStyle={{ fontSize: '12px', color: '#3f3f46', width: '35%' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-zinc-400">Không có dữ liệu</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Chart 4: Doanh thu theo Năm */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-800 mb-6 tracking-tight">Tăng trưởng doanh thu theo Năm</h3>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueByYear} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                            <YAxis
                                tickFormatter={(value) => `${value / 1000000}M`}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717a', fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value: any) => [formatCurrency(Number(value)), 'Doanh thu']}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#0ea5e9"
                                strokeWidth={4}
                                dot={{ r: 6, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
