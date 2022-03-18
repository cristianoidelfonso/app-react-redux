import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import Users from "./pages/users";
import Categories from "./pages/categories";
import Brands from "./pages/brands";
import Products from "./pages/products";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import InfoModal from "./pages/categories/InfoModal";

const App = () => {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link 
            to={"/"} 
            className="navbar-brand">
              Ideltech
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link 
                to={"/home"} 
                className="nav-link">
                  Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link 
                  to={"/mod"} 
                  className="nav-link">
                    Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link 
                  to={"/admin"} 
                  className="nav-link">
                    Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <>
                <li className="nav-item">
                  <Link 
                    to={"/user"} 
                    className="nav-link">
                      User
                  </Link>
                </li>
              
            
                <li className="nav-item">
                  <Link
                    to={"/categories"}
                    className="nav-link">
                      Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to={"/brands"}
                    className="nav-link">
                    Brands
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    to={"/products"}
                    className="nav-link">
                    Products
                  </Link>
                </li>
              </>
              )
            }
               
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link 
                  to={"/profile"} 
                  className="nav-link">
                    {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to={"/login"} 
                  className="nav-link" 
                  onClick={logOut}>
                    Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link 
                  to={"/login"} 
                  className="nav-link">
                    Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to={"/register"} 
                  className="nav-link">
                    Register
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            
            <Route path="/users" element={<Users />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/products" element={<Products />} />
            
            <Route path="/modal" element={<InfoModal />} />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;