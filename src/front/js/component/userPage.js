import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/userPage.css"
import { Context } from "../store/appContext";



export const UserPage = () => {
   const { store, actions } = useContext(Context)
  const handleLogout = () => {
     setIsLoggedIn(false);
   };
   const formatDate = (dateString) => {
     if (!dateString) {
       return ""; // Devuelve una cadena vacía si dateString es null o undefined
     }
  
     const dateToFormat = new Date(dateString)
     const month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0")
     const formattedDate = `${dateToFormat.getFullYear()}-${month}-${dateToFormat.getDate()}`;
  
     return formattedDate;
   };
  const [formattedBirthday, setFormattedBirthday] = useState(formatDate(store?.userBirthday));
   useEffect(() => {
     setFormattedBirthday(formatDate(store.userBirthday))
   }, [store.userBirthday]);
  return (

      
    
    
    <>
      <div className="container userPage-container">
        
        <div className=" col-lg-9 ">
          <div className="main-user">
          <form className="form-user">
              <div className="row">
                <div className="mb-3 col-lg-6 ">
                  <label htmlFor="userName" className="form-label">Name</label>
                  <input type="text" className="form-control input-user" id="userName" defaultValue={store?.userName} disabled />
                </div>
                <div className="mb-3 col-lg-6 ">
                  <label htmlFor="userSurname" className="form-label">Surname</label>
                  <input type="text" className="form-control input-user" id="userSurname" defaultValue={store?.userLastName} disabled aria-describedby="emailHelp" />
                </div>
              </div>
             <div className="row">
               <div className="mb-3 col-lg-6 ">
                 <label htmlFor="exampleInputEmail1" className="form-label">Nickname</label>
                 <input type="text" className="form-control input-user" id="exampleInputEmail1" disabled defaultValue={store?.nickname} />
             </div>
               <div className="mb-3 col-lg-6 ">
                 <label htmlFor="birthday" className="form-label">Birthday</label>
                 <input type="date" className="form-control input-user" id="birthday" disabled defaultValue={formattedBirthday} />
               </div>
             </div>
           </form>
         </div>
       </div>
     </div>
 </>

  );
}