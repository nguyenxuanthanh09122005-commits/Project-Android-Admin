import React, { useEffect, useState } from 'react'
import type { BookingResponse } from '../../type/typeBooking';
import { getListBookings } from '../../services/apiBookings';

export default function Bookings() {
  const [bookings, setBookings] = React.useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getListBookings();
      setBookings(res)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }
  console.log(bookings, "bookingss");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [])
  return (
    <div>Bookings</div>
  )
}
