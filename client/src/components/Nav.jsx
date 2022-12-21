import React from 'react';
import logoBG from "../assets/no-bg-logo.png";
import {Link} from "react-router-dom"

function Nav({props}) {

    

  return (
    <div className='nav-container'>
      <div className='img-container'>

     <Link to="/"> <img src={logoBG} alt="logo" /> </Link>
      </div>
    <ul className='ul-nav'>
        {props?
        props.map((li,i)=>{
            return(         
                 <li key={i}>{<Link to={li.redirect}>
                 {li.li} </Link>}</li> 
            )
        })
        : null}
    </ul>
    </div>
  )
}

export default Nav