import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/userSlice";


const Register = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [password2, setpassword2] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);

;
  const handleSubmit = () => {
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
    navigate("/login")
    
  };


  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account.</p>
        <section className="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter your name..."
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
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
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password2"
              value={password2}
              placeholder="Confirm your password..."
              onChange={(e) => {
                setpassword2(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-button"
            onClickCapture={handleSubmit}
          >
            Submit
          </button>
        </section>
      </section>
    </div>
  );
};

export default Register;
