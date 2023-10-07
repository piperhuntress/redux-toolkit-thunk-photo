import { Link, Navigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const isSuccess = useSelector((state) => state.user.isSuccess);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");

    // Additional logout logic (e.g., clearing local storage, redirecting, etc.)
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
            <li>
              <button>
                <FaSignOutAlt onClick={handleLogout} />
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
