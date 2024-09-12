import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // get the logged in user as soon as the component loads
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleGetProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/product", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Hello, {loggedInUser}</h1>
      {products &&
        products.map((product) => <li key={product.name}>{product.name}</li>)}
      <button onClick={handleGetProducts}>Get Products</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
