import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import AddRoom from "./component/room/AddRoom";
import "bootstrap/dist/css/bootstrap.css";
import ExistingRoom from "./component/room/ExistingRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import EditRoom from "./component/room/EditRoom";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./component/room/Room";
import RoomListing from "./component/room/RoomListing";
import Admin from "./component/admin/Admin";
import BookingForm from "./component/booking/BookingForm";
import CheckOut from "./component/booking/CheckOut";
import BookingSuccess from "./component/booking/BookingSuccess";
import Bookings from "./component/booking/Bookings";
import FindBooking from "./component/booking/FindBooking";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Profile from "./component/auth/Profile";
import Logout from "./component/auth/Logout";
import AuthProvider from "./component/auth/AuthProvider";
function App() {
  return (
    <AuthProvider>
      <main>
        {/* <Navbar /> */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<CheckOut />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
