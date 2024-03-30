import React, { useState, useEffect } from "react";
import Login from './screens/Login';
import Register from './screens/Register';
import Main from './screens/Main';
import Reply from './screens/Reply';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stats from "./screens/Stats";
import Landing from "./screens/Landing";
import './App.css';

function App() {
  useEffect(()=>{
    fetch('http://localhost:8080/init',{method: "GET"})
    .then(Response => Response.json())
    
  }, [])
  return (
    <div>
        <Router>
         <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={ <Register/> } />
          <Route path="/main" element={ <Main/> } />
          <Route path="/reply" element={ <Reply/> } />
          <Route path="/stats" element={ <Stats/> } />
          </Routes>
        </Router>
      
        </div>
  );
}

export default App;
