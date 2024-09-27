import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5454",
});
// Add room
export async function addRoom(photo, roomType, price) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("price", price);

  const response = await api.post("/api/rooms/", formData);

  response.status === 200 ? true : false;
}
// Get room types
export async function getRoomTypes() {
  try {
    const response = await api.get("/api/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}
// Get all
export async function getAllRooms() {
  try {
    const response = await api.get("/api/rooms/");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room data");
  }
}
// Delete
export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/api/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting room");
  }
}
// Update
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("price", roomData.price);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/api/rooms/update/${roomId}`, formData);
  return response;
}
// Get room by id
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/api/rooms/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room");
  }
}
// ================ Bookings =========================
// Booking room
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `api/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    throw new Error("Error booking room");
  }
}
// Get alls booking
export async function getAllBookings() {
  try {
    const response = await api.get(`api/bookings/`);
    return response.data;
  } catch (error) {
    throw new Error("Error get all bookings");
  }
}
// Get booking by confirmation code
export async function getAllBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(
      `api/bookings/confirmation/${confirmationCode}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Error find booking");
  }
}
// Cancel booking
export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(
      `api/bookings/booking/${bookingId}/delete`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Error cancel booking");
  }
}
// Get available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const response = await api.get(
      `api/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Error cancel booking");
  }
}
