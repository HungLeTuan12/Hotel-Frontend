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
function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
            <Route path="/add-room" element={<AddRoom />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
