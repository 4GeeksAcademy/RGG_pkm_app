import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { store, actions } = useContext(Context);

  useLayoutEffect(() => {
    // Ajustar el scroll al inicio del componente cada vez que se monte
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterClick = () => {
    setShowLoginForm(false);
    document
      .querySelector(".container__login-register")
      .classList.add("formulario__register-active");
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    document
      .querySelector(".container__login-register")
      .classList.remove("formulario__register-active");
  };

  useEffect(() => {
    if (store.auth) {
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        // Si hay una ruta almacenada en localStorage, redirige al usuario a esa ruta después del inicio de sesión
        localStorage.removeItem("redirectPath"); // Limpiar el localStorage
        navigate(redirectPath);
      } else {
        // Si no hay una ruta almacenada en localStorage, redirige al usuario a la página principal
        navigate("/pokedex");
      }
    }
  }, [store.auth, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    const success = await actions.login(email, password);

    if (success) {
      // Actualiza el estado de autenticación
      actions.setAuthentication(true);
   
    } else {
      setErrorMessage("Password or email incorrect");
      
      
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const last_name = event.target.last_name.value;
    const nickname = event.target.nickname.value;
    const email = event.target.email.value;
    const birthday = event.target.birthday.value;
    const password = event.target.password.value;

    const requirements = [
      "At least 8 characters in length",
      "At least one uppercase letter",
      "At least one lowercase letter",
      "At least one digit"
    ];

    if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password)) {
      const formattedRequirements = requirements.map(req => `<li>${req}</li>`).join('');
      setAlertMessage(`<p class='text-black'>Password must meet the following requirements:</p><ul>${formattedRequirements}</ul>`);
      return;
    }

    const response = await fetch(process.env.BACKEND_URL + "/api/private", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, last_name, nickname, email, birthday, password }),
    });

    const data = await response.json();

    if (response.status === 200 && data.message === "User registered successfully") {
      setShowSuccessAlert(true);
      setAlertMessage("User registered successfully!");
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/login");
        handleLoginClick();
      }, 3000);
    } else if (response.status === 409 && data.message === "Nickname already exists") {
      setAlertMessage("Nickname already exists");
    } else {
      setAlertMessage(data.message);
    }
  };

  return (
    <main>
      <div className="container__todo">
        <div className="caja__trasera">
          <div className="caja__trasera__login">
            <h3>Already have an account?</h3>
            Log in to access the page
            <button id="btn__iniciar-sesion" onClick={handleLoginClick}>
              Log in
            </button>
          </div>
          <div className="caja__trasera-register">
            <h3>Don't have an account yet?</h3>
            Register and enjoy the benefits
            <button id="btn__registrarse" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
        {/* Login and registration form */}
        <div className="container__login-register">
          <form
            action=""
            className={`formulario__login ${
              showLoginForm ? "active" : "inactive"
            }`}
            onSubmit={handleLogin}
          >
            <h2>Log in</h2>
            {errorMessage && (
              <div className="alert alert-warning" role="alert">
                {errorMessage}
              </div>
            )}
            <input type="text" name="email" placeholder="Email" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <br />
            <button type="submit">Enter</button>
          </form>
          <form
            action=""
            className={`formulario__register ${
              showLoginForm ? "inactive" : "active"
            }`}
            onSubmit={handleRegister}
          >
            <h2>Register</h2>
            {alertMessage && (
              <div
                className={`alert ${
                  showSuccessAlert ? "alert-success text-black" : "alert-warning text-black"
                }`}
                role="alert"
                dangerouslySetInnerHTML={{ __html: alertMessage }}
              />
            )}
            <input type="text" name="name" placeholder="Name" />
            <br />
            <input type="text" name="last_name" placeholder="Last Name" />
            <br />
            <input type="text" name="nickname" placeholder="Nickname" />
            <br />
            <input type="text" name="email" placeholder="Email" />
            <br />
            <input type="date" name="birthday" placeholder="Birthday" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
  );
};
