import React from 'react';
import logoBG from "../assets/no-bg-logo.png";

function Nav({props}) {

    

  return (
    <div className='nav-container'>
      <div className='img-container'>

      <img src={logoBG} alt="logo" />
      </div>
    <ul className='ul-nav'>
        {props?
        props.map((li,i)=>{
            return(         
                <li key={i}>{li}</li>
            )
        })
        : null}
    </ul>
    </div>
  )
}

export default Nav