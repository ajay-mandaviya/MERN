import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  // console.log(location.pathname);

  const currentTab = (location, path) => {
    if (location.pathname === path) {
      return { color: "#2ecc72" };
    } else return { color: "#FFFFFF" };
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link to="/" style={currentTab(location, "/")} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cart"
            style={currentTab(location, "/cart")}
            className="nav-link"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/dashboard"  style={currentTab(location, "/user/dashboard")}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard" style={currentTab(location, "/admin/dashboard")}>
            Admin Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={currentTab(location , "/signup")}>
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin" style={currentTab(location , "/signin")}>
            SignIn
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signout" style={currentTab(location , '/signout')}>
            SignOut
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
