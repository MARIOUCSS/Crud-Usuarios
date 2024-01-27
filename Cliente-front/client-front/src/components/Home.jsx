import React, { useEffect, useState } from "react";
import { url } from "../auth/auth";
import axios from "axios";
import Busqueda from "./Busqueda";
import Modal from "./Modal";
import { Userc } from "../Context/User";
function Home() {
  // const [user, setUser] = Userc();
  const { user, setUser } = Userc();
  //este userb quiero mandarlo para le modal
  const [userb, setUserb] = useState({});
  const getUsers = async () => {
    try {
      const res = await axios.get(`${url}/user`);
      if (res.data.success) {
        setUser(res.data.Users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteuser = async (id) => {
    // const token = localStorage.getItem("auth");
    try {
      console.log("Intentando eliminar usuario con ID:", id);
      const response = await axios.delete(
        `${url}/user/${id}`
        // Headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
      );
      if (response.data.success) {
        getUsers();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
  //Encontrar usuario
  const updateuser = async (id) => {
    //  console.log(id);
    try {
      const res = await axios.get(`${url}/user/${id}`);
      if (res.data.success) {
        setUserb(res.data.ExistingUser);
      }
    } catch (error) {
      console.error("Error al encontrar el usuario:", error);
    }
    // console.log(userb);
  };
  // useEffect(() => {
  //   //console.log(userb);
  //   if (userb) {
  //     console.log(userb);
  //   }
  // }, [userb]);
  //
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Busqueda />
      <div className="d-flex w-75 ml-10 mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job Title</th>
              <th scope="col">Company</th>
              <th scope="col">Manage Users</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {user.map((x, index) => (
              <tr key={x._id}>
                <th scope="row">{index + 1}</th>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.jobTitle}</td>
                <td>{x.company}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => updateuser(x._id)}
                    //ojo para llamar al modal
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteuser(x._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* aqui esta el modal pero no guarda */}
      <Modal userbb={userb} setuserb={setUserb} getUsers={getUsers} />
    </>
  );
}

export default Home;
