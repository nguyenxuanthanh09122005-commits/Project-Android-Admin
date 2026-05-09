export type MoviesType = {
    movieId: number,
    movieName: string,
    description: string,
    duration: number,
    releaseDate: Date | string,
    posterImage: string,
    trailerUrl: string,
    genre: string,
    ageRating: string
}

export type MoviesType_1 = {
    movieName: string,
    description: string,
    duration: number,
    releaseDate: Date | string,
    posterImage: string,
    trailerUrl: string,
    genre: string,
    ageRating: string
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    // title: string;
    children: React.ReactNode;
}
