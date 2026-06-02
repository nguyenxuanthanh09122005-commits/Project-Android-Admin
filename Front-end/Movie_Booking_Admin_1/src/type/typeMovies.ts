import type { GenreType } from "./typeGenre";

export type MoviesTypeRequest = {
    movieName: string,
    description: string,
    duration: number,
    releaseDate: Date | string,
    posterImage: string,
    trailerUrl: string,
    status: MoviesStatus,
    genreIds: number[],
    ageRating: string
}

export type MoviesTypeResponse = {
    movieId: number,
    movieName: string,
    description: string,
    duration: number,
    releaseDate: Date | string,
    posterImage: string,
    trailerUrl: string,
    status: MoviesStatus,
    genres: GenreType[],
    ageRating: string
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;

    children: React.ReactNode;
}
export type MoviesStatus = "COMING_SOON" | "EARLY_ACCESS" | "SHOWING" | "ENDED";
