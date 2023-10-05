import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",

  });

  const { email,password}=formData

  const onChange=(e)=>{
    setformData((prevState)=>({ 
       ...prevState,
       [e.target.name] :e.target.value
    }))
  }
  const onSubmit=()=>{

  }
  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login</p>
        <section className="form">
          <form onClick={onSubmit}>
             <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              placeholder="Enter your email..." onChange={onChange}
            />
             </div>             
             <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter your password..." onChange={onChange}
            />
             </div>  

             <button type="submit" className="btn btn-button">Submit</button>                     
          </form>
         
        </section>
      </section>
    </div>
  );
};

export default Login;
