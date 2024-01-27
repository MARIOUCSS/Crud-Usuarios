import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Userc } from "../Context/User";
function Busqueda() {
  //const [token, setToken] = Userc();
  // const [user, setUser] = Userc();
  const { user, setUser, token, setToken } = Userc();
  const [busqUser, setBusqUser] = useState("");
  //const [searchTerm, setSearchTerm] = useState("");
  const handleSignOut = () => {
    localStorage.removeItem("auth");
    setToken("");
  };
  const FiltarUsuario = () => {
    //e.preventDefault();
    const pp = [...user];
    const filtaru = pp.filter((x) =>
      x.name.toLowerCase().includes(busqUser.toLowerCase())
    );
    // ///setUser([filtaru]);
    // console.log(filtaru);
    //console.log(pp);
    console.log(filtaru);

    setUser(filtaru);
  };

  const MostrarNO = () => {
    const pp = [...user];
    if (busqUser !== "") {
      FiltarUsuario();
    } else {
      setUser(pp);
    }
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create User
        </button>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setBusqUser(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={MostrarNO}
          >
            {busqUser !== "" ? "Search" : "Clear"}
          </button>
        </form>
        <div className="mb-3">
          {!token ? (
            <Link to="/Login">
              <button className="btn btn-outline btn-primary ">Login</button>
            </Link>
          ) : (
            <button
              className="btn btn-outline btn-primary"
              onClick={handleSignOut}
            >
              Signout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Busqueda;
