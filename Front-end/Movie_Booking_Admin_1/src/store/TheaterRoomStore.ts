import { create } from 'zustand';
import type { TheaterRoomType } from '../type/typeTheaterRooms';

export type TheaterRoomStoreType = {
    theaterRooms_zustand: TheaterRoomType[],
    setTheaterRooms_zustand: (theaterRooms: TheaterRoomType[]) => void,
}


export const TheaterRoomStore = create<TheaterRoomStoreType>((set) => ({
    theaterRooms_zustand: [],
    setTheaterRooms_zustand: (theaterRooms) => set({ theaterRooms_zustand: theaterRooms }),
}));