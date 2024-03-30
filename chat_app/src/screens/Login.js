import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Register.css"
export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className='formContainer'>
        <div className='logoContainer'>
          <span className='logo'>StarTalk</span>
          
        </div>
        <div className='formWrapper'>
            
            <span className='title'>Welcome back!</span>
            
              <input id='email' type = "email" placeholder='email'
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              />
              <input id='password' type = "password" placeholder='password'
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
              <button onClick={(e) => {
              fetch('http://localhost:8080/login', {method: 'POST', body: `email=${Email}&password=${Password}`,
              headers: {'Content-type': 'application/x-www-form-urlencoded'}})
              .then(response => response.json())
              .then(data =>
                {
                if(data['message']){
                    alert(data['message'])
                  } else {
                    alert (`Welcome back ${data[0]['username']} ` )
                    navigate('/main', {state: {username: data[0]['username']}})
                  }
                }
              )
              .then(document.getElementById('email').value = '',
              document.getElementById('password').value = '')
              .catch(error => console.error(error))
              }}
              
              >Login</button>
            
            <p>
              Need an account?{" "}
              <a href='#' className='registerLink' onClick = {() => navigate('/register')}> 
                Register
              </a>
            </p>
        </div>
        </div>
  )

}
export default Login;