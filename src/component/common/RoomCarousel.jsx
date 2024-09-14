import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Row, Container } from "react-bootstrap";
const RoomCarousel = () => {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", price: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms().then((data) => {
      setRooms(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading room...</div>;
  }
  if (errorMessage) {
    return <div className="mt-5 mb-5 text-danger">Error: {errorMessage}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link
        to={"/browse-all-rooms"}
        className="nav-link hotel-color font-bold mb-2"
      >
        Browse all rooms
      </Link>
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/jpeg;base64, ${room.photo}`}
                          alt="Room photo"
                          className="w-100"
                          style={{
                            width: "100%",

                            height: "auto",
                          }}
                        ></Card.Img>
                      </Link>
                      {/* Detail */}
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                          ${room.price}/night
                        </Card.Title>
                        <div className="flex-shrink-0 mt-3">
                          <Link
                            to={`bookings/${room.id}`}
                            className="btn btn-hotel btn-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
export default RoomCarousel;
