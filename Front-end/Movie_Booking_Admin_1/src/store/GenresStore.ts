import { create } from 'zustand';
import type { GenreType } from '../type/typeGenre';

export type GenresStoreType = {
    genres_zustand: GenreType[],

    setGenres_zustand: (genres: GenreType[]) => void,
}

export const GenresStore = create<GenresStoreType>((set) => ({
    genres_zustand: [],

    setGenres_zustand: (genres) => set({ genres_zustand: genres }),
}));