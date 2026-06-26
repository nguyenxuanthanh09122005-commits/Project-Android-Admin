import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
  // const { genres_zustand, fetchGenres } = GenresStore();
  // fetchGenres();
  // useEffect(() => {
  //   fetchGenres();
  // }, []);
  // console.log(genres_zustand, "genres in admin layout");

  return (
    <div className="flex h-screen overflow-hidden bg-sidebar">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-background rounded-tl-3xl border-t border-l border-zinc-200/50 shadow-2xl shadow-black/5 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}