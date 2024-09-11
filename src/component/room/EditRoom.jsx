import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { roomId } = useParams();
  // Handle image change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };
  // Call API
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
        console.log("Image preview: ", imagePreview);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [roomId]);
  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateRoom(roomId, room);

      if (response.status === 200) {
        setSuccessMessage("Room updated successfully !");
        const updatedRoomData = await getRoomById(roomId);
        console.log("Updated room: ", updatedRoomData);

        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room !");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setRoom({ ...room, [name]: value });
  };

  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="mt-5 mb-2 text-center">Edit Room</h1>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit} action="">
              {/* Room type */}
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  <h5>Room type</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="roomType"
                  name="roomType"
                  value={room.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>
              {/* Price */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <h5>Price</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="price"
                  name="price"
                  value={room.price}
                  onChange={handleRoomInputChange}
                />
              </div>
              {/* Photo */}
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  <h5>Photo</h5>
                </label>
                <input
                  type="file"
                  className="form-control"
                  required
                  id="photo"
                  name="photo"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  ></img>
                )}
              </div>
              {/* Button */}
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Edit room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditRoom;
