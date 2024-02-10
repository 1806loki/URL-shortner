import { Link } from "react-router-dom";
import "./Navbar.css";

import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";
import { useUserContext } from "../../context/userContext";

const Navbar = () => {
  const { userData } = useUserContext;
  console.log(userData);
  return (
    <div className="navbar">
      <div className="container">
        <h3>URL Shortener</h3>

        <ul className="menu">
          <li>
            <Link to="/">
              <i>
                <IoHomeOutline />
              </i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i>
                <RxDashboard />
              </i>
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="user-menu">
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </li>
          <li className="user-avatar" id="user-avatar">
            <i>
              <RxAvatar />
            </i>
            Lokesh
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
