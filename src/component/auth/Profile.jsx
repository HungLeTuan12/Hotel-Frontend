import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../utils/ApiFunction";
const Profile = () => {
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const userData = await getUserInfo(userId, token);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);
  return <div></div>;
};
export default Profile;
