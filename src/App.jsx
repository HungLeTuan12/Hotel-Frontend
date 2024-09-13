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
function App() {
  return (
    <>
      <main>
        {/* <Navbar /> */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
