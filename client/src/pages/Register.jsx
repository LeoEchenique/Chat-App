import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import FormItem from "../components/FormIitem";
import logoCard from "../assets/logo-chat.png";
function Register() {

  const [log,setLog]= useState(true)
  const [form,setForm]= useState({})

  const handleChange=(e)=>{
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(form)
  }

  return (
    <>
    {
      log === false ? 
      <>
    <Nav props={["Home", "Sign in", "About"]} />
    <div className="form-container">
      <form className="form" onSubmit={(e)=>handleSubmit(e)} onChange={(e)=> handleChange(e)}>
        <h2>Register to chat with your people from all over the world</h2>
        <div className="bubbleChat">
        <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
        </div>
                <div className="input-container">
            <FormItem props={{type:"text", name:"username", placeholder:"Username"}} />
            <FormItem props={{type:"text", name:"email", placeholder:"Email"}} />
            <FormItem props={{type:"text", name:"password", placeholder:"Password"}} />
            <FormItem props={{type:"text", name:"confirm-pass", placeholder:"Confirm password"}} />

      </div>
        <button type="submit" className="btn-reg">Go to chat</button>
        
      <span>Already register? <span className="log" onClick={()=> setLog(true)}>LOGIN</span> </span>
      </form>
          </div>  
          </>
    : 
    <>
    <Nav props={["Home", "Sign up", "Chat room", "About"]} />
    <div className="form-container">
      <form className="form" onSubmit={(e)=>handleSubmit(e)} onChange={(e)=> handleChange(e)}>
        <h2>Sign in to chat with your people from all over the world</h2>
        <div className="bubbleChat login">
        <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
        </div>
                <div className="input-container login">
            <FormItem props={{type:"text", name:"username", placeholder:"Username"}} />
            <FormItem props={{type:"password", name:"password", placeholder:"Password"}} />
      </div>
      <div className="bubbleChat">
        <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
          <img src={logoCard} alt="bubbleChat" />
        </div>
        <button type="submit" className="btn-reg">Go to chat</button>
        
      <span>Don't have an account? <span className="log" onClick={()=> setLog(!log)}>Sign up!</span> </span>
      </form>
          </div>  
          </>
    }
      
      </>
  );
}

export default Register;

/* 
          <input type="text" name="Username" placeholder="Username" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="password" placeholder="Password" />
          <input type="text" name="confirm-password" placeholder="Confirm password" />
*/