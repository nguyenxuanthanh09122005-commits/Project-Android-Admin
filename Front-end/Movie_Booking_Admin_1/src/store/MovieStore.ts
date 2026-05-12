import { create } from 'zustand';

import type { MoviesType } from '../type/typeMovies';

export type MovieStoreType = {
    movies_zustand: MoviesType[],
    setMovies_zustand: (movies: MoviesType[]) => void,
}


export const MovieStore = create<MovieStoreType>((set) => ({
    movies_zustand: [],
    setMovies_zustand: (movies) => set({ movies_zustand: movies }),
}));