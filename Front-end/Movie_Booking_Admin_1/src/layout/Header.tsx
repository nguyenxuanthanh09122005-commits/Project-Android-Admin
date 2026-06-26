import { useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";

export default function Header() {
    // const token = localStorage.getItem("token");
    const { token, setLogout } = AuthStore();
    const navigate = useNavigate()

    const handleLogout = () => {
        setLogout();
        navigate("/login");
    }

    return (
        <div className="h-20 bg-surface/80 backdrop-blur-md border-b border-zinc-200/50 flex justify-between items-center px-8 sticky top-0 z-10">
            <div className="w-full">
                {token ? (
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-zinc-800">Chào mừng trở lại, Admin</h2>
                            <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-medium border border-brand-200">System Online</span>
                        </div>
                        <button 
                            onClick={handleLogout} 
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-zinc-600 hover:text-rose-600 text-sm font-medium border border-zinc-200 hover:border-rose-200 transition-all duration-300 shadow-sm hover:shadow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Đăng xuất
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}