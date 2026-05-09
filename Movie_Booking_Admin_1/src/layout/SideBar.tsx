import { NavLink } from "react-router-dom";
// import clsx from "clsx";

const menu = [
    // { path: "/", label: "Dashboard" },
    { path: "/movies", label: "Quản lý Phim" },
    { path: "/cinemas", label: "Quản lý Rạp chiếu" },
    { path: "/theaterrooms", label: "Quản lý Phòng chiếu" },
    { path: "/seats", label: "Quản lý Ghế" },
    { path: "/showtimes", label: "Quản lý Ghế" },
    { path: "/bookings", label: "Quản lý Đặt vé" },
];

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-gray-300 p-5 flex flex-col">
            <h1 className="text-xl font-bold text-white mb-6">
                Admin
            </h1>
            <nav className="flex flex-col gap-2">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}

                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}