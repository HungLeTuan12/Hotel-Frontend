import React, { useState } from "react";
const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );

    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filters rooms by type
      </span>
      <select
        name=""
        id=""
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="">Select a room type to filter...</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onCanPlay={clearFilter}>
        Clear filter
      </button>
    </div>
  );
};
export default RoomFilter;
