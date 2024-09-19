import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunction";
import {
  FaCar,
  FaLanguage,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";
const CheckOut = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    price: "",
  });
  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId).then((response) => {
        setRoomInfo(response);
        setIsLoading(false);
      });
    }, 2000);
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info mt-3">
                <img
                  src={`data:image/jpeg;base64, ${roomInfo.photo}`}
                  alt="Room image"
                  style={{ width: "100%", height: "200px" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Room Type: </th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Price: </th>
                      <td>{roomInfo.price}</td>
                    </tr>
                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi /> Wifi
                          </li>
                          <li>
                            <FaTv /> Neflix Premium
                          </li>
                          <li>
                            <FaUtensils /> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt /> Mini Bar Refreshment
                          </li>
                          <li>
                            <FaCar /> Car Service
                          </li>
                          <li>
                            <FaLanguage /> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};
export default CheckOut;
