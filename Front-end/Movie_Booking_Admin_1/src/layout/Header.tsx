import { useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";

export default function Header() {
    // const token = localStorage.getItem("token");
    const { token, setLogout } = AuthStore();
    console.log(setLogout);
    const navigate = useNavigate()

    const handleLogout = () => {
        setLogout();
        navigate("/login");
    }
    return (
        <div className="h-20 bg-white shadow flex justify-between items-center px-6">

            <div className="w-full">
                {token ? (
                    <div className="flex flex-row justify-between items-center ">
                        <span className="text-2xl font-bold text-indigo-600">Chào mừng Admin</span>
                        <button onClick={handleLogout} className="px-[15px] py-[5px] rounded-[5px] bg-red-500 text-white font-bold">Logout</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}