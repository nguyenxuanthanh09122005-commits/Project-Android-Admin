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
// import Register from '../pages/auth/Register';
import DetailMovies from '../pages/movies/DetailMovies';
import DetailCinemas from '../pages/cinemas/DetailCinemas';
import DetailShowTimes from '../pages/showtimes/DetailShowTimes';
import Home from '../pages/home/Home';
import ProtectedRouter from './ProtectedRouter';
import PublicRouter from './PublicRouter';
import Statistic from '../pages/statistic/Statistic';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<PublicRouter><Login /></PublicRouter>} />
                {/* <Route path='/register' element={<Register />} /> */}
                <Route path='/' element={<ProtectedRouter><AdminLayout /></ProtectedRouter>}>
                    <Route path='/' element={<Home />} />
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
                    <Route path='/statistic' element={<Statistic />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;