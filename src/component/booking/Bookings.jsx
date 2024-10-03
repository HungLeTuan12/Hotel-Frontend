import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";
import { da } from "date-fns/locale";
import Header from "../common/Header";
import BookingTable from "./BookingTable";
const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllBookings().then((data) => {
        setBookingInfo(data);
        setIsLoading(false);
      });
    }, 5000);
  });
  console.log("bookinInfor", bookingInfo);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <section className="" style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && (
        <div className="text-danger">
          Have wrong when display all bookings !!
        </div>
      )}
      {isLoading ? (
        <div>Loading existings bookings</div>
      ) : (
        <BookingTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};
export default Bookings;
