import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    const userInfoCopy = { ...userInfo };
    userInfoCopy[id] = value;
    setUserInfo(userInfoCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/user/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Handle successful signup

        navigate("/login");

        // clean-up the inputs if response is ok
        setUserInfo({
          name: "",
          email: "",
          password: "",
        });
        setError(null);
      } else {
        console.error(data.message); // Handle error
        setError(data.message); // use the error message from the server to display in the UI
      }
    } catch (error) {
      console.error("Failed To Signup", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If the user is already authenticated, redirect to home
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            autoFocus
            id="name"
            value={userInfo.name}
            placeholder="Enter Your Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={userInfo.email}
            placeholder="Enter Your Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={userInfo.password}
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? Go to <Link to={"/login"}>Login</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
