import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email,password,password2}=formData

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
          <FaUser />
          Register
        </h1>
        <p>Please create an account.</p>
        <section className="form">
          <form onClick={onSubmit}>
            <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter your name..." onChange={onChange}
            />
             </div>
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
             <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password2"
              value={password2}
              placeholder="Confirm your password..." onChange={onChange}
            />
             </div>   
             <button type="submit" className="btn btn-button">Submit</button>                     
          </form>
         
        </section>
      </section>
    </div>
  );
};

export default Register;
