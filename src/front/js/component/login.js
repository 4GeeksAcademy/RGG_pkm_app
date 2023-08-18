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
               <h2 className="title-login">Crea tu usuario en nuestra Pokedex!</h2>
            <form className="formulario">
                <label for="name">Nombre:</label>
                <input type="text" id="name" value={nombre} onChange={e => setNombre(e.target.value)} />
                <label for="alias">Nickname:</label>
                <input type="text" id="alias" value={alias} onChange={e => setAlias(e.target.value)} />
                <label for="mail">Correo electrónico:</label>
                <input type="mail" id="mail" value={mail} onChange={e => setMail(e.target.value)} />
                <label for="password">Password</label>
                <input type="password" id="password" value={pass} onChange={e => setPass(e.target.value)}/>
                <button>Iniciar sesion</button>
            </form>
        </div>
    )
}