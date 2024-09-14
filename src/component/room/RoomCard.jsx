import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col className="mb-4" key={room.id} xs={12}>
      <Card className="p-2">
        {/* Body */}
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <CardImg
              variant="top"
              src={`data:image/jpeg;base64, ${room.photo}`}
              alt="Room photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            ></CardImg>
          </div>
          {/* Details */}
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">${room.price}/night</Card.Title>
            <Card.Text>
              Some room information goes here for tth guest to read through
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`bookings/${room.id}`} className="btn btn-hotel btn-sm">
              View/Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default RoomCard;
