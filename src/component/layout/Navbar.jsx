import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertinary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link className="nav-link" to={"/"}>
          <span className="hotel-color">LakeSide Hotel</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          {/* List */}
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse All Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Manage Rooms
              </NavLink>
            </li>
          </ul>
          {/* List 2 */}
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/find-booking"}
              >
                Find My Bookings
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
              >
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link to={"/login"} className="dropdown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={"/logout"} className="dropdown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
