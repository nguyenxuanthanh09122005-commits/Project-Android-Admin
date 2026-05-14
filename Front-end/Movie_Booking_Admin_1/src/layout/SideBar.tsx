import { NavLink } from "react-router-dom";

const menu = [
    // {
    //     path: "/",
    //     label: "Trang chủ",
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    //         </svg>
    //     )
    // },
    {
        path: "/movies",
        label: "Quản lý Phim",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125h-7.5c-.621 0-1.125.504-1.125 1.125m0-4.875h7.5c.621 0 1.125-.504 1.125-1.125M9 3.375h6c.621 0 1.125.504 1.125 1.125v13.5c0 .621-.504 1.125-1.125 1.125H9c-.621 0-1.125-.504-1.125-1.125V4.5c0-.621.504-1.125 1.125-1.125Z" />
            </svg>
        )
    },
    {
        path: "/cinemas",
        label: "Quản lý Rạp chiếu",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
            </svg>
        )
    },
    // {
    //     path: "/theaterrooms",
    //     label: "Quản lý Phòng",
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.75h12M6 10.5h12m-12 3.75h12M4.5 3h15a2.25 2.25 0 0 1 2.25 2.25v13.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 18.75V5.25A2.25 2.25 0 0 1 4.5 3Z" />
    //         </svg>
    //     )
    // },
    {
        path: "/showtimes",
        label: "Quản lý Suất chiếu",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
        )
    },
    {
        path: "/bookings",
        label: "Quản lý Đặt vé",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-3-12h15c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125h-15a1.125 1.125 0 0 1-1.125-1.125V7.125C2.25 6.504 2.754 6 3.375 6Z" />
            </svg>
        )
    },
    {
        path: "/statistic",
        label: "Thống kê",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
        )
    },
];
const email = localStorage.getItem("email");
export default function Sidebar() {
    return (
        <div className="w-72 bg-slate-900 text-slate-400 p-6 flex flex-col h-screen border-r border-slate-800 shadow-2xl">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-black text-white tracking-tight uppercase">
                        Movie<span className="text-indigo-500">Hub</span>
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Admin Dashboard</p>
                </div>
            </div>

            {/* Menu Section */}
            <nav className="flex flex-col gap-1 flex-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Main Menu</p>
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? "bg-indigo-600/10 text-indigo-400 font-semibold shadow-sm"
                                : "hover:bg-slate-800 hover:text-slate-200"
                            }
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm tracking-wide">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="px-2 mb-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-800">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-200 truncate">Administrator</p>
                            <p className="text-[10px] text-slate-500 truncate">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}