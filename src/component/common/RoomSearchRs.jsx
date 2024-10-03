import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunction";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearch from "./RoomSearch";

const RoomSearchRs = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    console.log("submit");

    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    console.log("checkIndATE", searchQuery.checkInDate);
    console.log("checkIndATE", searchQuery.checkOutDate);

    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMessage("Please enter valid date range !");
      return;
    }
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Check-in date must come before check-out date !");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("availbale room", availableRooms);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    setSearchQuery({ ...searchQuery, [name]: value });

    if (checkIn.isValid() || checkOut.isValid()) {
      setErrorMessage("");
    }
  };

  const clearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };
  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  id="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  // min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  id="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  // min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Room Type</Form.Label>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit">
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {availableRooms ? (
          <RoomSearch results={availableRooms} onClearSearch={clearSearch} />
        ) : (
          <p>No rooms available for the selected dates and room type</p>
        )}
      </Container>
    </>
  );
};
export default RoomSearchRs;
