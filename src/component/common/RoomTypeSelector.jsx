import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunction";
const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showRoomTypeInput, setShowRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  // Get all room types
  useEffect(() => {
    getRoomTypes().then((data) => {
      // console.log("data: ", data);

      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomInputChange = (e) => {
    // console.log("e: ", e.target.value);

    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowRoomTypeInput(false);
    }
  };
  // roomTypes.map((key, value) => {
  //   console.log("value: ", value);
  //   console.log("key", key);
  // });
  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            className="form-control"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            <hr></hr>
            {roomTypes.map((key, value) => (
              <option key={value} value={key}>
                {key}
              </option>
            ))}
          </select>
          {/* )} */}

          {/* Check show room if room = true, user can enter new room */}
          {showRoomTypeInput && (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a new room"
                onChange={handleNewRoomInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default RoomTypeSelector;
