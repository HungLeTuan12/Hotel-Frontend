import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Services"} />
        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color">TuanHung Hotel</span>
            <span className="gap-2">
              <FaClock /> - 24-Hours Front Desk
            </span>
          </h4>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {/* Col1 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi /> Wifi
                </Card.Title>
                <Card.Text>
                  Stay connected with high-speed internet access
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Col2 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils /> Breakfast
                </Card.Title>
                <Card.Text>
                  Stay your day with a delicious breakfast buffet
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Col2 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt /> Laundry
                </Card.Title>
                <Card.Text>
                  Keep your clothes clean and fresh with our laundry service
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Col2 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail /> Mini-Bar
                </Card.Title>
                <Card.Text>
                  Enjoy a refreshing drink or snack from our in-room mini-bar
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Col2 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking /> Parking
                </Card.Title>
                <Card.Text>
                  Park your car convinently in our on-site parking lot
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Col2 */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake /> Air conditioning
                </Card.Title>
                <Card.Text>
                  Park your car convinently in our on-site parking lot
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HotelService;
