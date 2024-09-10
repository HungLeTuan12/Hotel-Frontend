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
  const response = await api.put(`/rooms/update/${roomId}`);
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
