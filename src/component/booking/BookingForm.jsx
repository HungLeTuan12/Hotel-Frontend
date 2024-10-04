import React, { useDebugValue, useEffect, useState } from "react";
import { bookRoom, getAllRooms, getRoomById } from "../utils/ApiFunction";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import moment from "moment";
const BookingForm = () => {
  const userId = localStorage.getItem("userId");
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
    userId: userId,
  });

  const roomId = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    price: "",
  });

  useEffect(() => {
    const getRoomPriceById = async () => {
      try {
        const response = await getRoomById(roomId.roomId);
        console.log("response", response);

        setRoomPrice(response.price);
        console.log("roomPrice", roomPrice);
      } catch (error) {
        console.log("Loi he thong");
        throw new Error(error);
      }
    };
    getRoomPriceById();
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    console.log("paymentPerDay", paymentPerDay);

    return diffInDays * paymentPerDay;
  };

  const isGuestValid = () => {
    const adultCount = booking.numOfAdults;
    const childrenCount = booking.numOfChildren;
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come before check-in date !");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (
      form.checkValidity() === false ||
      !isGuestValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };
  // Handle booking
  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId.roomId, userId, booking);
      console.log("bookingconfirm", booking);

      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body">
              <h4 className="card card-title text-center">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <FormControl
                    required
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}
                    onChange={handleInputChange}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Full name */}
                <Form.Group>
                  <Form.Label htmlFor="guestFullName" className="hotel-color">
                    Full Name:
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Check-in and check-out date */}
                <fieldset style={{ border: "2px" }}>
                  <legend className="mt-2">Lodging period</legend>
                  <div className="row">
                    {/* Check in date */}
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate" className="hotel-color">
                        Check-In Date:{" "}
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="Enter your check-in date"
                        onChange={handleInputChange}
                      ></FormControl>
                      <Form.Control.Feedback type="invalid">
                        Please select a check-in date
                      </Form.Control.Feedback>
                    </div>
                    {/* Check out date */}
                    <div className="col-6">
                      <Form.Label
                        htmlFor="checkOutDate"
                        className="hotel-color"
                      >
                        Check-Out Date:{" "}
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="Enter your check-out date"
                        onChange={handleInputChange}
                      ></FormControl>
                      <Form.Control.Feedback type="invalid">
                        Please select a check-out date
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>
                {/* Number of guest */}
                <fieldset>
                  <legend className="mt-2">Number of Guest</legend>
                  <div className="row">
                    {/* numberOfAdults */}
                    <div className="col-6">
                      <Form.Label htmlFor="numOfAdults" className="hotel-color">
                        Adults:{" "}
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numOfAdults"
                        name="numOfAdults"
                        value={booking.numOfAdults}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      ></FormControl>
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 adult
                      </Form.Control.Feedback>
                    </div>
                    {/* Num of children */}
                    <div className="col-6">
                      <Form.Label
                        htmlFor="numOfChildren"
                        className="hotel-color"
                      >
                        Children:{" "}
                      </Form.Label>
                      <FormControl
                        type="number"
                        id="numOfChildren"
                        name="numOfChildren"
                        value={booking.numOfChildren}
                        placeholder="0"
                        min={0}
                        onChange={handleInputChange}
                      ></FormControl>
                    </div>
                  </div>
                </fieldset>
                {/* Button */}
                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
          {/* Layout right when success */}
          <div className="col-md-6">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                isFormValid={isValidated}
                onConfirm={handleBooking}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingForm;
