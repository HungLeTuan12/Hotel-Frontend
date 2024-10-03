import React, { useState } from "react";
import { registrationner } from "../utils/ApiFunction";
const Register = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registrationner(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Registration error !!");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);
  };
  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}
      <h2>Register</h2>
      <form onSubmit={handleRegistration} action="">
        {/* First name */}
        <div className="row mb-3">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            Firstname
          </label>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* First name */}
        <div className="row mb-3">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Lastname
          </label>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={registration.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Email */}
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={registration.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Password */}
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={registration.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Button */}
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  );
};
export default Register;
