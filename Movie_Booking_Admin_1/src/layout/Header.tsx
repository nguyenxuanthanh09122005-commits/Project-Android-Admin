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
            <h2>Admin Panel </h2>
            <div>
                {token ? (
                    <>
                        <span className="mr-4">Chào mừng Admin</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : null}
            </div>
        </div>
    );
}