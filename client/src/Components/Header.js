import { Link, Navigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, reset } from "../features/userSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const isSuccess = useSelector((state) => state.user.isSuccess);

  const handleLogout = async () => {
    try {
      // Clear the JWT token from local storage
      //localStorage.removeItem("jwtToken");

      // Dispatch the logout action
      dispatch(logout());

      // Clear user data in the Redux store
      dispatch(reset());

      // Navigate to the login page
      navigate("/login");

      // Add any additional logic you need for logout (e.g., invalidating sessions, etc.)

      // Respond with a success message or redirect to the login page
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header">
      <h1>PHOTO GALLERY</h1>
      <p>Photo gallery-redux toolkit and thunk</p>

      <ul>
        {!isSuccess ? (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>{user.email}</li>
            <Link to="/blog">Blog Posts</Link>
            <li>
              <button onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
