import React, { useState } from 'react'
import type { TheaterRoomType, TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
export type { TheaterRoomTypeRequest } from '../type/typeTheaterRooms';
type TheaterRoomsProps = {
    theaterRoomItem: TheaterRoomType | null,
    cinemaId: number,
    onSuccess: () => void
    reloadData: () => void
}
export default function FormTheaterRooms({ theaterRoomItem, cinemaId, onSuccess, reloadData }: TheaterRoomsProps) {
    const [formData, setFormData] = useState<TheaterRoomTypeRequest>({
        cinemaId: cinemaId,
        roomName: theaterRoomItem ? theaterRoomItem.roomName : '',
        totalSeats: theaterRoomItem ? theaterRoomItem.totalSeats : 0
    })
    console.log(cinemaId, "cineeeee");

    return (
        <div>FormTheaterRooms</div>
    )
}
