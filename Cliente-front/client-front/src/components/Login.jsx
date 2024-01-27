import React, { useState } from "react";
import axios from "axios";
import { url } from "../auth/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Userc } from "../Context/User";
function Login() {
  const navigate = useNavigate();
  //const location = useLocation();
  const [message, setMessage] = useState("");
  const { Token, setToken } = Userc();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const OnsubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/user/Login`, login);
      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data.token));
        //ojo
        setToken(data.token);
        setMessage(data.message);
        navigate("/");
      } else {
        setMessage(data.message);
      }

      // if (res.data.success) {
      //   // toast.success(res.data && res.data.message);
      //   console.log(res.data);
      //   // setMessage(res.data.message);
      //   // localStorage.setItem("auth", JSON.stringify(res.data.token));
      //   // navigate("/");
      // } else {
      //   toast.error(res.data.message);
      //   setMessage(res.data.message);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card mt-5 ml-4 md-4">
      <div className="card-body">
        <form onSubmit={OnsubmitLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>

          <div id="emailHelp" className="form-text">
            {message}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
