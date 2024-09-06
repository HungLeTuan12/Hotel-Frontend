import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    price: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.price
      );
      console.log("Success: ", success);

      if (success === undefined) {
        setSuccessMessage("A new room was added successfully !");
        setNewRoom({ photo: null, roomType: "", price: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room, please try again !");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="mt-5 mb-2 text-center">Add a New Room</h1>
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
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
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
                  value={newRoom.price}
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
                  // value={newRoom.price}
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  ></img>
                )}
              </div>
              {/* Button */}
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddRoom;
