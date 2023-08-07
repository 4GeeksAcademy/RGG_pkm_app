import React,{useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"

import  "../../styles/navbar.css"
export const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const handleLogout = () => {
	  setIsLoggedIn(false);
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-bg">
  <div className="container-fluid">
  <div className="col-2">
   <a href="/" className="li-logo"><img src={logo} className="navbar-brand logo col-sm-4 " ></img></a>
   </div>

	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	  <span className="navbar-toggler-icon"></span>
	</button>
	<div className="collapse navbar-collapse" id="navbarSupportedContent">
  
	<form className="d-flex ms-3 me-3 form-navbar" >
   <input className="form-control  bg-light input-form " type="search"  placeholder="Buscar" aria-label="Search" />
   <span className="btn bg-light br-0 btn-submit" type="submit" >
   <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ml-1" viewBox="0 0 16 16">
	 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
   </svg>
 </span>

</form>
	  <div className="btn  buttton-login-navbar mb-2 mb-lg-0 col-md-7  col-sm-4 ">
{isLoggedIn ? (
  <>
			<Link className="text-light text-decoration-none user-navbar btn " to="/userPage"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person icon-login-navbar" viewBox="0 0 16 16">
			<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
		  </svg>Mi perfil</Link>
		  <button className="btn text-light text-decoration-none logout-button " onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
  <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
</svg>Cerrar sesión</button>
		</>
   
	   
		 
	 
		 
		  ) : (
			<Link className="text-light text-decoration-none user-navbar btn col-sm-12" to="/userPage"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil icon-login-navbar" viewBox="0 0 16 16">
			<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
		  </svg>Log in</Link>
		  )}
		  </div>
	</div>
  </div>
</nav>
	);
};
