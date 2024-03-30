import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Register.css"
export const Register = () => {
  const [UserNameReg, setUserNameReg] = useState('')
  const [emailReg, setEmailReg] = useState('')
  const [passReg, setPassReg] = useState('')
  const navigate = useNavigate()
  return (
    <div className='formContainer'>
        <div className='logoContainer'>
          <span className='logo'>StarTalk</span>
          
        </div>
        <div className='formWrapper'>
            
            <span className='title'>Create an account</span>
            
            <input  type = "UserName" placeholder='UserName'
              onChange={(e)=>{
                setUserNameReg(e.target.value)
              }}
            />
            <input  type = "email" placeholder='email'
              onChange={(e)=>{
                setEmailReg(e.target.value)
              }}
            />
            <input  type = "password" placeholder='password'
              onChange={(e)=>{
                setPassReg(e.target.value)
              }}
            />
            <input style={{display:"none"}} type = "file" id ="file"/>
              
            <label htmlFor='file'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpEvEl5W56tlV7E2SCnU5mROtuj0L8XxOjpeZz11WyM27qqXF66-hAxDUWq5_9fLQkKc&usqp=CAU" alt='' className='avatar'/>
              <span>Add Avatar?</span>
            </label>
            
            
            <button onClick={(e) => {
              fetch('http://localhost:8080/register', {method: 'POST', body: `username=${UserNameReg}&email=${emailReg}&password=${passReg}`,
              headers: {'Content-type': 'application/x-www-form-urlencoded'}})
              .then(response => response.json())
              .then(data => console.log(data))
              .then(alert(`Username: ${UserNameReg}, Email: ${emailReg}, Password: ${passReg} has been created`))
              .catch(error => console.error(error))
              }}
            >Sign up</button>
            
            <p>Already had an account? {" "}
              <a href='#' className='registerLink' onClick = {() => navigate('/login')}> 
                Login
              </a>
              </p>
        </div>
        </div>
  )
}
export default Register;
