import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/editUser.css"



export const EditUser = () => {

  const { store, actions } = useContext(Context);
  const [name, setName] = useState(store.userName);
  const [last_name, setLast_name] = useState(store.userLastName);
  const [email, setEmail] = useState(store.email || "");
  const [birthday, setBirthday] = useState(store?.userBirthday);
  const [nickname, setNickname] = useState(store.nickname);
  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isMessageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();



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

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const { store, actions } = useContext(Context)

    if (id === 'newemail') {
      setNewEmail(value);
    } else if (id === 'confirmemail') {
      setConfirmEmail(value);
    }

    setPasswordMatch(newEmail === confirmEmail);
  };
  const editContact = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      last_name: last_name,
      email: email,
      nickname: nickname,
      birthday: birthday,
      currentPassword: currentPassword,
    };
  
    // Validar la nueva contraseña solo si el campo password no está vacío
    if (password.trim() !== "") {
      if (password.length < 8 ||
          !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password) ||
          !/\d/.test(password)) {
        setErrorMessage(`La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial`);
        return;
      }
      user.newPassword = password;
    }
  
    if (!currentPassword.trim()) {
      setErrorMessage("Por favor, ingresa la contraseña actual.");
      return;
    }
    
    actions.editUser(user)
      .then((response) => {
        console.log(user);
        if (response && response.Msg === 'Usuario editado satisfactoriamente') {
          setMessageSent(true);
          setTimeout(() => {
            actions.signOut();
            navigate("/login");
            navigate(0);
          }, 2000);

        } else if (response && response.error) {
          setErrorMessage(response.error);
        } else {
          // Otros errores que no sean 403 ni mensajes de error específicos
          setErrorMessage("Error al editar el usuario. Por favor, intenta de nuevo más tarde.");
        }
      })
      .catch((error) => {
        // Aquí puedes manejar errores que ocurran durante la solicitud
        console.log("Error en la solicitud al backend:", error);
        setErrorMessage("Error en la solicitud al backend. Por favor, intenta de nuevo más tarde.");
      });
  };



  return (

    <div className="container userPage-container">
      <div className="aside-user col-lg-3">
        <p className="fw-bold">{store.user?.name}</p>
        <Link to="/userPage" className="personal-aside-edit-user"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>Personal information</Link>
        <Link to="/editUser" className="edit-user-active"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>Edit information</Link>

      </div>
      <div className=" col-lg-9">
        <div className="main-user">

          <form onSubmit={e => editContact(e)} className="form-user mt-3">
            <div className="row">
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="userName" className="form-label">New name</label>
                <input type="text" className="form-control input-user" id="userName"
                  onChange={e => setName(e.target.value)} value={name} />
              </div>

              <div className="mb-3 col-lg-6 ">
                <label htmlFor="userSurname" className="form-label">New surname</label>
                <input type="text" className="form-control input-user" id="userLastname"
                  onChange={e => setLast_name(e.target.value)} value={last_name} aria-describedby="emailHelp" />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="exampleInputEmail1" className="form-label">New nickname</label>
                <input type="text" className="form-control input-user" id="exampleInputEmail1"
                  onChange={e => setNickname(e.target.value)} value={nickname} />

              </div>
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="birthday" className="form-label">New birthday</label>
                <input type="date" className="form-control input-user" id="birthday"
                  onChange={e => setBirthday(e.target.value)} value={formattedBirthday} />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="actualPassword" className="form-label">Current Password</label>
                <input type="password" onChange={e => setCurrentPassword(e.target.value)} className="form-control input-user" id="currentPassword" value={currentPassword} />
              </div>
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="password" className="form-label">New password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-user" id="password" value={password} />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-lg-6 ">
                <label htmlFor="confirmPassword" className="form-label">Confirm new password</label>
                <input type="password" onChange={e => setConfirmPassword(e.target.value)} className="form-control input-user" id="confirmPassword" />
              </div>
              <div className="mb-3 col-lg-6">
                <label htmlFor="newemail" className="form-label">New email</label>
                <input type="email" className="form-control input-user" id="newemail"
                  placeholder="a@a.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              {/* <div className="mb-3 col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="confirmemail" className="form-label">Confirm new email</label>
                <input type="email" className={`form-control ${emailMatch ? '' : 'is-invalid'}`}
                  id="confirmemail" placeholder="a@a.com" value={confirmEmail} 
                  onChange={e=>setEmail(e.target.value)}/>
                  {!emailMatch && <div className="invalid-feedback">Emails do not match.</div>}
              </div> */}
            </div>
            {errorMessage && (
              <div className="alert alert-danger col-12" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="button-user">
              <button type="reset" className="btn cancel-user">Cancel</button>
              <button type="submit" className="btn submit-user">Submit</button>
              {isMessageSent && (
                <div className="success-message">
                  Edit has been succesfull!
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>




  );
};