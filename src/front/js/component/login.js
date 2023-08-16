import React,{useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"
import  "../../styles/login.css"


export const Login = () =>{
    const [nombre, setNombre] = useState("")
    const [pass, setPass] = useState("")
    const [alias, setAlias] = useState("")
    const [mail, setMail] = useState("")


    return(
        <div>
            <h1>Login</h1>
            <form className="formulario">
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="text" value={alias} onChange={e => setAlias(e.target.value)} />
                <input type="mail" value={mail} onChange={e => setMail(e.target.value)} />
                <input type="password" value={pass} onChange={e => setPass(e.target.value)}/>
                <button>Iniciar sesion</button>
            </form>
        </div>
    )
}