import React, { useEffect, useState } from 'react'
import type { MoviesType } from '../../type/typeMovies';
import { getListMovies } from '../../services/moviesAPI';
import { MovieCard } from '../../components/MovieCard';
import Modal from '../../components/Modal';
import FormMovies from '../../components/FormMovies';


export default function Movies() {
    const [loading, setLoading] = useState(false);
    console.log(loading);
    const [isOpen, setIsOpen] = useState(false);
    const [movies, setMovies] = useState<MoviesType[]>([]);
    const [isCreate, setIsCreate] = useState<MoviesType | null>(null);
    console.log(isCreate);

    console.log(movies);
    const loadData = async () => {
        setLoading(true);
        try {
            const res = await getListMovies();
            console.log(res, "listMovies");
            setMovies(res)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadData();
    }, [])


    const showing = movies.filter((item: MoviesType) => {
        const releaseDate = new Date(item.releaseDate);
        const today = new Date();
        return releaseDate <= today;
    })

    const coming_soon = movies.filter((item: MoviesType) => {
        const releaseDate = new Date(item.releaseDate);
        const today = new Date();
        return releaseDate > today;
    })
    console.log(showing, "screeshowingning");
    console.log(coming_soon, "coming_soon");

    // const CreateMovies = () => {

    // }
    const OnClose = () => {
        setIsOpen(false);
    }
    const DisplayEdit = (id: number) => {
        setIsOpen(true);
        console.log(id);

    }
    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold text-gray-800 mb-10 border-b pb-4">Quản Lý Danh Sách Phim</h1>
            <div className='flex flex-row-reverse w-full'>

                <button className='rounded-[5px] font-semibold  bg-blue-400 text-white px-[10px] py-[15px]' onClick={() => { setIsOpen(true); setIsCreate(null) }}>Thêm mới</button>
            </div>

            <section className="mb-16">
                <div className="flex items-center mb-6">
                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                    <h2 className="text-2xl font-semibold text-gray-700">Phim Đang Chiếu</h2>
                    <span className="ml-3 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {showing.length} phim
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {showing.map((item: MoviesType) => (
                        <MovieCard key={item.movieId} item={item} handleIsOpen={() => setIsOpen(true)} />
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center mb-6">
                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                    <h2 className="text-2xl font-semibold text-gray-700">Phim Sắp Chiếu</h2>
                    <span className="ml-3 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {coming_soon.length} phim
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {coming_soon.map((item: MoviesType) => (
                        <MovieCard key={item.movieId} item={item} handleIsOpen={() => DisplayEdit(item.movieId)} />
                    ))}
                </div>
            </section>
            <Modal isOpen={isOpen} onClose={OnClose}>
                <FormMovies onSuccess={() => setIsOpen(false)} reloadData={loadData} />
            </Modal>
        </div >
    )
}
