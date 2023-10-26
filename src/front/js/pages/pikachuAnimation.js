import React from 'react';
import { Link } from "react-router-dom";
import  "../../styles/pikachuAnimation.css"

export const PikachuAnimation = () => {
  return (
    <div className='pikachu-animation-bg'>
        <div className='container-fluid p-4'>
          <div className='row'>
            <div className='col-6'>
              <img src="https://media.giphy.com/media/xx0JzzsBXzcMK542tx/giphy.gif" className="col-6 pikachu"alt="Pikachu Animation"/>
            </div>
            <div className='col-6 d-flex justify-content-center align-items-center'>
            <Link to="/pokedex" className="btn btn-hazte d-flex">Hazte con todos!</Link>
</div>
      </div>
     
       </div>
    </div>
  );

}
