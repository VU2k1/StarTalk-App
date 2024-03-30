import React, {useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import "./Reply.css"
const Stats = () => {
    const navigate = useNavigate()
    const {state} = useLocation();
    var username
    setTimeout(function(){
        
        username = state['username']
        
    }, 100);
    useEffect(()=>{
        fetch('http://localhost:8080/getMostRep',{method: "GET"})
        .then(Response => Response.json())
        .then(data =>
            document.getElementById('repStats').innerHTML = `User with most Reply: ${data['mostREP']} `)
        }, [])
    useEffect(()=>{
        fetch('http://localhost:8080/getMostMsg',{method: "GET"})
        .then(Response => Response.json())
        .then(data =>
            document.getElementById('msgStats').innerHTML = `User with most Messages: ${data['mostMSG']} `
            )
        }, [])
    
  return (
    <div className='replyContainer'>
        <div  className='repChat'>
            <span id='repStats' className='repStats'>hello</span>
            <span id= 'msgStats' className='msgStats'>hello</span>
            <img src = 'https://image.pngaaa.com/443/3944443-middle.png' onClick={() => navigate('/main', { state: { username: username} })}></img>
        </div>
    </div>
  )
}

export default Stats