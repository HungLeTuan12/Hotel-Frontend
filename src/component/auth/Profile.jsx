import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingHistory, getUserInfo } from "../utils/ApiFunction";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import BookingTable from "../booking/BookingTable";
import { da } from "date-fns/locale";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState(null);
  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      getBookingHistory(userId).then((data) => {
        console.log("Data", data);

        setBooking(data);
        setIsLoading(false);
      });
    }, 5000);
  }, [userId]);
  console.log("userId", userId);

  console.log("booking", booking);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const userData = await getUserInfo(userId, token);
        setUser(userData);
        console.log("user", user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Container className="py-5">
        <Row>
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{user.firstName}</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button variant="primary">Change</Button>
                  <Button variant="outline-primary" className="ms-1">
                    Message
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">First Name</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">{user.firstName}</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Last name</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">{user.lastName}</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Email</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">{user.email}</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Phone</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">(097) 234-5678</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Mobile</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">(098) 765-4321</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Address</p>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">
                      Bay Area, San Francisco, CA
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {isLoading ? (
        <p>Loading bookings rooms</p>
      ) : (
        <section className="container">
          <h3 className="text-center">Booking History</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Booking ID</th>
                <th>Room ID</th>
                <th>Room Type</th>
                <th>Check-in date</th>
                <th>Check-out date</th>
                <th>Guest Name</th>
                <th>Guest Email</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Total Guest</th>
                <th>Confirmation Code</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {booking?.map((bk, index) => (
                <tr key={bk.id}>
                  <td>{index + 1}</td>
                  <td>{bk.id}</td>
                  <td>{bk.room.id}</td>
                  <td>{bk.room.roomType}</td>
                  <td>{bk.checkInDate}</td>
                  <td>{bk.checkOutDate}</td>
                  <td>{bk.guestFullName}</td>
                  <td>{bk.guestEmail}</td>
                  <td>{bk.numOfAdults}</td>
                  <td>{bk.numOfChildren}</td>
                  <td>{bk.totalGuest}</td>
                  <td>{bk.bookingConfirmCode}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleBookingCancellation(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
};

export default Profile;
