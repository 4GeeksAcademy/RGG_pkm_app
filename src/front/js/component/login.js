import React,{useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"
import  "../../styles/login.css"


export const Login = () =>{
    const [nombre, setNombre] = useState("")
    const [password, setPass] = useState("")
    const [alias, setAlias] = useState("")
    const [mail, setMail] = useState("")
    const [confirmPass, setConfirmPass] = useState("")


    return(
        <div>
               <h2 className="title-login">Crea tu usuario en nuestra Pokedex!</h2>
            <form className="formulario">
                {/* <label for="name">Nombre:</label> */}
                <input className="input-login" type="text" id="name" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                {/* <label for="alias">Nickname:</label> */}
                <input className="input-login" placeholder="Nickname" type="text" id="alias" value={alias} onChange={e => setAlias(e.target.value)} />
                {/* <label for="mail">Correo electrónico:</label> */}
                <input className="input-login" type="mail" placeholder="Correo electrónico" id="mail" value={mail} onChange={e => setMail(e.target.value)} />
                {/* <label for="password">Password</label> */}
                <input className="input-login" type="password" placeholder="Password" id="pass" value={password} onChange={e => setPass(e.target.value)}/>
                <input className="input-login" type="password" placeholder="Confirm password" id="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}/>
                <button className="btn-danger">Crea tu usuario!</button>
            </form>
        </div>
    )
}