import React, { useContext, useEffect, useState } from "react";
import "../../styles/userPage.css";
import { Context } from "../store/appContext";

export const UserPage = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({
    name: "",
    userLastName: "",
    nickname: "",
    userBirthday: "",
  });

  useEffect(() => {
    // Hacer una solicitud HTTP para obtener los datos del usuario desde Flask
    fetch(process.env.BACKEND_URL + "/api/register")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado local con los datos del usuario obtenidos
        setUserData(data); // Suponiendo que el servidor devuelve un objeto JSON con las propiedades name, userLastName, nickname y userBirthday
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  return (
    <>
      <div className="container userPage-container">
        <div className="col-lg-9">
          <div className="main-user">
            <form className="form-user">
              <div className="row">
                <div className="mb-3 col-lg-6">
                  <label htmlFor="userName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control input-user"
                    id="userName"
                    Value={userData.name}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label htmlFor="userSurname" className="form-label">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="form-control input-user"
                    id="userSurname"
                    defaultValue={userData.userLastName}
                    disabled
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-lg-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Nickname
                  </label>
                  <input
                    type="text"
                    className="form-control input-user"
                    id="exampleInputEmail1"
                    disabled
                    defaultValue={userData.nickname}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label htmlFor="birthday" className="form-label">
                    Birthday
                  </label>
                  <input
                    type="date"
                    className="form-control input-user"
                    id="birthday"
                    disabled
                    defaultValue={userData.userBirthday}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
