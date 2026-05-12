import { useSearchParams } from 'react-router-dom';
import type { ShowTimesResponse } from '../type/typeShowTimes'

export default function FilterShowTimes({ showTimes }: { showTimes: ShowTimesResponse[] }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        movieName: searchParams.get('movieName') || "",
        cinemaName: searchParams.get('cinemaName') || "",
        startTime: searchParams.get('startTime') || "",
        chooseDate: searchParams.get('chooseDate') || "",
        page: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 15,
    }

    const listMovie: string[] = [];
    showTimes.forEach((movie) => {
        if (!listMovie.includes(movie.movieName)) {
            listMovie.push(movie.movieName);
        }
    });

    const listCinema: string[] = [];
    showTimes.forEach((cinema) => {
        if (!listCinema.includes(cinema.cinemaName)) {
            listCinema.push(cinema.cinemaName);
        }
    });

    const listStartTime: string[] = [];
    showTimes.forEach((showTime) => {
        const timeString = new Date(showTime.startTime).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        if (!listStartTime.includes(timeString)) {
            listStartTime.push(timeString);
        }
    });

    const updateFilters = (newValues: Partial<typeof filters>) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(newValues).forEach(([key, value]) => {
            if (value === "" || value === null) {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });
        setSearchParams(newParams);
    };

    const handleReset = () => {
        updateFilters({
            movieName: "",
            cinemaName: "",
            startTime: "",
            chooseDate: ""
        });
    };


    const hasActiveFilters = filters.movieName || filters.cinemaName || filters.startTime || filters.chooseDate;

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">🔍 Bộ lọc</h2>
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                        ✕ Xóa
                    </button>
                )}
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 ">
                {/* Movie Filter */}
                <div>
                    <select
                        value={filters.movieName}
                        onChange={(e) => updateFilters({ ...filters, movieName: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-medium focus:outline-none focus:border-blue-500 transition"
                    >
                        <option value="">🎬 Phim</option>
                        {listMovie.map((movieName) => (
                            <option key={movieName} value={movieName}>{movieName}</option>
                        ))}
                    </select>
                </div>

                {/* Cinema Filter */}
                <div>
                    <select
                        value={filters.cinemaName}
                        onChange={(e) => updateFilters({ ...filters, cinemaName: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-medium focus:outline-none focus:border-blue-500 transition"
                    >
                        <option value="">🎪 Rạp</option>
                        {listCinema.map((cinemaName) => (
                            <option key={cinemaName} value={cinemaName}>{cinemaName}</option>
                        ))}
                    </select>
                </div>

                {/* Time Filter */}
                <div>
                    <select
                        value={filters.startTime}
                        onChange={(e) => updateFilters({ ...filters, startTime: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-medium focus:outline-none focus:border-blue-500 transition"
                    >
                        <option value="">⏰ Giờ</option>
                        {listStartTime.sort().map((timeString) => (
                            <option key={timeString} value={timeString}>{timeString}</option>
                        ))}
                    </select>
                </div>

                {/* Date Filter */}
                <div>
                    <input
                        type='date'
                        value={filters.chooseDate}
                        onChange={(e) => updateFilters({ ...filters, chooseDate: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-medium focus:outline-none focus:border-blue-500 transition"
                    />
                </div>


            </form>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-300">
                    <div className="flex flex-wrap gap-1">
                        {filters.movieName && (
                            <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-semibold">
                                {filters.movieName}
                            </span>
                        )}
                        {filters.cinemaName && (
                            <span className="px-2 py-0.5 bg-purple-500 text-white rounded text-xs font-semibold">
                                {filters.cinemaName}
                            </span>
                        )}
                        {filters.startTime && (
                            <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs font-semibold">
                                {filters.startTime}
                            </span>
                        )}
                        {filters.chooseDate && (
                            <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-semibold">
                                {new Date(filters.chooseDate).toLocaleDateString('vi-VN')}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
