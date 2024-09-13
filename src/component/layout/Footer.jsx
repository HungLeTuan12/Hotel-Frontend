import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  let today = new Date();
  return (
    <footer className="bg-dark text-light py-3 footer mt-lg-5">
      <div className="container">
        <div className="row">
          <p className="">&copy; {today.getFullYear()} Hotel</p>
        </div>
      </div>
      {/* <Container>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p className="mb-0">&copy; {today.getFullYear()} Hotel</p>
          </Col>
        </Row>
      </Container> */}
    </footer>
  );
};
export default Footer;
