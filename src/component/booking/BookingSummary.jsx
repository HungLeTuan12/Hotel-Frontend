import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  console.log("payment", payment);

  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsBookingConfirmed(true);
      setIsProcessingPayment(false);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);
  return (
    <div className="card card-body mt-5">
      <h4 className="text-center">Reservation Summary</h4>
      <p className="">
        Name: <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date:{" "}
        <strong>{moment(booking.checkInDate).format("L")}</strong>
      </p>
      <p>
        Check-In Date:{" "}
        <strong>{moment(booking.checkOutDate).format("L")}</strong>
      </p>
      <p>
        Number of days: <strong>{numOfDays}</strong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
        </strong>
        <br />
        <strong>
          Children: {booking.numOfChildren > 0 ? booking.numOfChildren : "0"}
        </strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total payment: <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  >
                    Booking Confirmed, redirecting to payment ....
                  </span>
                </>
              ) : (
                "Confirm Booking and proceed to payment"
              )}
            </Button>
          ) : (
            // isBookingConfirmed(
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading</span>
              </div>
            </div>
            // )
          )}
        </>
      ) : (
        <p className="text-danger">
          Check-out date must be after check-in date
        </p>
      )}
    </div>
  );
};
export default BookingSummary;
