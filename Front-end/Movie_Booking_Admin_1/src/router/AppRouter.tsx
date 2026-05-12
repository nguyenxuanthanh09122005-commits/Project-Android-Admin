import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout';
import Movies from '../pages/movies/Movies';
import Cinemas from '../pages/cinemas/Cinemas';
import Theaterrooms from '../pages/theaterrooms/Theaterrooms';
import Seats from '../pages/seats/Seats';
import ShowTimes from '../pages/showtimes/ShowTimes';
import Bookings from '../pages/bookings/Bookings';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DetailMovies from '../pages/movies/DetailMovies';
import DetailCinemas from '../pages/cinemas/DetailCinemas';

import DetailShowTimes from '../pages/showtimes/DetailShowTimes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<AdminLayout />}>
                    <Route path='/' element={<h1>Chào mừng Admin quay trở lại </h1>} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/movies/:id' element={<DetailMovies />} />
                    <Route path='/cinemas' element={<Cinemas />} />
                    <Route path='/cinemas/:id' element={<DetailCinemas />} />
                    <Route path='/theaterrooms' element={<Theaterrooms />} />
                    {/* <Route path='/theaterrooms/:id' element={<DetailTheaterrooms />} /> */}
                    <Route path='/theaterrooms/:id/seats' element={<Seats />} />
                    <Route path='/showtimes' element={<ShowTimes />} />
                    <Route path='/showtimes/:id' element={<DetailShowTimes />} />
                    <Route path='/bookings' element={<Bookings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;