import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../auth/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Userc } from "../Context/User";
function Modal({ userbb, setuserb, getUsers }) {
  const navigate = useNavigate();
  // const [user, setUser] = Userc();
  const { user, setUser } = Userc();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobtitle] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  //
  useEffect(() => {
    if (userbb) {
      setName(userbb.name || "");
      setEmail(userbb.email || "");
      setJobtitle(userbb.jobTitle || "");
      setCompany(userbb.company || "");
      // Password se deja vacío al editar
      setPassword("");
    }
  }, [userbb]);
  const OnsubmitRegister = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setJobtitle("");
    setCompany("");
    setPassword("");
    try {
      if (userbb) {
        const res = await axios.put(`${url}/user/${userbb._id}`, {
          name,
          email,
          jobTitle,
          company,
          password,
        });
        if (res.data.success) {
          document.getElementById("exampleModal").classList.remove("show"); // Cerrar modal
          document.querySelector(".modal-backdrop").remove();
          getUsers();
          setuserb(null);
        }
      } else {
        const res = await axios.post(`${url}/user`, {
          name,
          email,
          jobTitle,
          company,
          password,
        });
        if (res.data.success) {
          //toast.success(res.data && res.data.message);
          // navigate("/");
          setUser([...user, res.data.user]);
          setuserb(null);
          document.getElementById("exampleModal").classList.remove("show"); // Cerrar modal
          document.querySelector(".modal-backdrop").remove();

          console.log("bien");
        }
      }

      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {userbb ? "Actualizar Usuario" : "Nuevo Usuario"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={OnsubmitRegister}>
              <div className="mb-3">
                <input
                  placeholder="Enter Your Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Your Company"
                  className="form-control"
                  value={jobTitle}
                  onChange={(e) => setJobtitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Ex.Developer"
                  className="form-control"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Enter Your password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {userbb ? "Actualizar Usuario" : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
