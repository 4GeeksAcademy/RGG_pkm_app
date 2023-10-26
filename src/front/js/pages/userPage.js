import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/userPage.css"
import { Context } from "../store/appContext";



export const UserPage = () => {
  const { store, actions } = useContext(Context)

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  


  return (
    <>
      <div className="container userPage-container">
     
        <div className=" col-lg-9 ">
          <div className="main-user">

            <form className="form-user">
              <div className="row">
                <div className="mb-3 col-lg-6 ">
                  <label htmlFor="userName" className="form-label">Name</label>
                  <input type="text" className="form-control input-user" id="userName" defaultValue={store?.user.name} disabled />
                </div>
                <div className="mb-3 col-lg-6 ">
                  <label htmlFor="userSurname" className="form-label">Surname</label>
                  <input type="text" className="form-control input-user" id="userSurname" defaultValue={store?.user.last_name} disabled aria-describedby="emailHelp" />
                </div>
              </div>


              <div className="row">
                <div className="mb-3 col-lg-12 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">Nickname</label>
                  <input type="text" className="form-control input-user" id="exampleInputEmail1" disabled defaultValue={store?.user.nickname} />

                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

  );
}