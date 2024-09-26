import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-4">
      <h2 className="text-center hotel-color">Welcome to Admin Panel</h2>
      <hr />
      <Link className="nav-link" to={"/add-room"}>
        Manage Rooms
      </Link>
      <Link className="nav-link" to={"/existing-bookings"}>
        Manage Bookings
      </Link>
    </section>
  );
};
export default Admin;
