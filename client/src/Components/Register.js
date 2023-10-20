import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/userSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const onSubmit = (data) => {
    /*     const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
    navigate("/login"); */
    console.log(data);
  };

  /*Validation */
  const RegisterValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Not valid email format")
      .required("Email is required"),
    password: yup.string().min(4).max(20).required("Pasword is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidationSchema),
  });

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name")}
              />
              <p className="error">{errors.name?.message}</p>
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
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
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
                {...register("password")}
              />
              <p className="error">{errors.password?.message}</p>
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
                {...register("password2")}
              />
              <p className="error">{errors.password2?.message}</p>
            </div>
            <button type="submit" className="btn btn-button">
              Submit
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Register;
