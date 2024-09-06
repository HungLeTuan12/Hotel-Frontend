import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5454",
});
export async function addRoom(photo, roomType, price) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("price", price);

  const response = await api.post("/api/rooms/", formData);

  response.status === 200 ? true : false;
}
export async function getRoomTypes() {
  try {
    const response = await api.get("/api/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}
