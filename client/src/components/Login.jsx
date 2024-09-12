import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [userInfo, setUserInfo] = useState({
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
      const url = "http://localhost:8000/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      // de-structuring the data that is send by the server
      const { message, success, jwtToken, name } = data;

      if (response.ok) {
        console.log(message); // Handle successful login

        // storing the token and name of the loggedInUser in the local-storage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        navigate("/");

        // clean-up the inputs if response is ok
        setUserInfo({
          email: "",
          password: "",
        });
        setError(null);
      } else {
        console.error(message); // Handle error
        setError(message); // use the error message from the server to display in the UI
      }
    } catch (error) {
      console.error("Failed To Login", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        New User? Go to <Link to={"/signup"}>Signup</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
