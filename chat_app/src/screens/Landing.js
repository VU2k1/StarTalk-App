import React from 'react'
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import "./Reply.css"
const Landing = props => {
    const navigate = useNavigate()
  return (
    <div className='LandingContainer'>
        <div className='logoContainer'>
          <span className='logo'>StarTalk</span>
          
        </div>
        <span className='intro'>Journey to Launch..</span>
        <img className='start' src='https://media.istockphoto.com/id/1249140544/vector/rocket-launch-to-space.jpg?s=612x612&w=0&k=20&c=BzFWvYaA_MhwNOQWgHeBcVH0gjQr5Od9skYSVhN73dY=' onClick={() => navigate('/login')}></img>
    </div>
  )
}

Landing.propTypes = {}

export default Landing