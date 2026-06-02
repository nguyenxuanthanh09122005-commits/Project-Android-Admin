import { create } from 'zustand';

import type { MoviesTypeResponse } from '../type/typeMovies';

export type MovieStoreType = {
    movies_zustand: MoviesTypeResponse[],
    setMovies_zustand: (movies: MoviesTypeResponse[]) => void,
}


export const MovieStore = create<MovieStoreType>((set) => ({
    movies_zustand: [],
    setMovies_zustand: (movies) => set({ movies_zustand: movies }),
}));