import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerpage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms().then((data) => {
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading rooms ...</div>;
  }
  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerpage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerpage;
    const endIndex = startIndex + roomsPerpage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };
  return (
    <Container>
      <Row className="mt-2">
        {/* Filter */}
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        {/* Paginator */}
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      {/* Render all rooms */}
      <Row>{renderRooms()}</Row>
      <Row className="mt-2">
        {/* Filter */}

        {/* Paginator */}
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Room;
