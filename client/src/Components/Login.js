import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/userSlice.js";
import * as yup from "yup";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);

  const LoginValidationSchema = yup.object().shape({});

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      console.log("success");
      navigate("/blog");
    } else {
      navigate("/login");
    }
    // dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch]);

  const handlogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login</p>
        <section className="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              placeholder="Enter your email..."
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter your password..."
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-button" onClick={handlogin}>
            Submit
          </button>
        </section>
      </section>
    </div>
  );
};

export default Login;
