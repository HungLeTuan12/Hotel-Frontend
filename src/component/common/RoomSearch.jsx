import React, { useState } from "react";
import RoomCard from "../room/RoomCard";
import { Button, Col, Row } from "react-bootstrap";
import RoomPaginator from "./RoomPaginator";

const RoomSearch = ({ results, onClearSearch }) => {
  console.log("....Loding");
  console.log("results", results.length);

  const [currentPage, setCurrentPage] = useState(1);
  const resultPerpage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultPerpage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultPerpage;
  const endIndex = startIndex + resultPerpage;
  const paginatedResult = results.slice(startIndex, endIndex);

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {paginatedResult.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row>
            {totalResults > resultPerpage && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};
export default RoomSearch;
