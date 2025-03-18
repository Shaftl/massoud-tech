import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import About from "./Pages/About";
import Homepage from "./Pages/Homepage";
import Smartphones from "./Pages/Smartphones";
import SinglePage from "./Pages/SinglePage";
import SinglePagev2 from "./Pages/SinglePagev2";
import Tablets from "./Pages/Tablets";
import OrderSection from "./Pages/Order";
import Footer from "./Pages/Footer";
import AddProduct from "./Pages/AddProduct";
import UpdateItemForm from "./Pages/UpdateItemForm";
import VoiceLogin from "./Pages/VoiceLogin"; // Import the VoiceLogin component
import { style } from "framer-motion/client";

function App() {
  const [auth, setAuth] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", auth);
  }, [auth]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Homepage />
                <About />
                <Smartphones />
                <Tablets />
                <OrderSection />
                <Footer />
              </div>
            }
          />
          <Route path={`/phone/:id`} element={<SinglePage />} />
          <Route path={`/tablet/:id`} element={<SinglePagev2 />} />

          {/* Voice Login Route */}
          <Route path="/login" element={<VoiceLogin setAuth={setAuth} />} />

          {/* Protected Route for Adding Items */}
          <Route
            path="addItem"
            element={
              auth ? (
                <div>
                  <AddProduct type="phone" />
                  <AddProduct type="tablet" />
                  <button className="buttonFill logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Update Item Route */}
          <Route
            path="/updateItem"
            element={<UpdateItemForm itemType="phones" itemId="698566" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
