import React, { useState, useEffect } from "react";

import "./Main.css";

import {useNavigate, useLocation} from 'react-router-dom'


const Main = () => {
  // SideBar
  const navigate = useNavigate()
  const {state} = useLocation();
  const [channelNames, setChannelNames] = useState([])
  var username
  var repMsg
  var Name
  setTimeout(function(){
    document.getElementById("username").innerHTML = state['username'];
    username = state['username']
  },1000)

  useEffect(()=>{
    fetch('http://localhost:8080/getChannels',{method: "GET"})
    .then(Response => Response.json())
    .then(data =>{
      setChannelNames(data)
    })
  }, [])

  const [nav, setNav] = useState(false);
  // Chat
  function delMsg(id){
    document.getElementById('channelName').innerHTML = id
    fetch('http://localhost:8080/deleteMessage', {
        method: 'POST', 
        body: `id=${id}`,
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    })
    .then(response => response.json())
    .then(data => { console.log(data['message']) })
    .then(alert("Message has just been deleted, refresh the page to see"))
}
          
  const [ChannelName, setChannelName] = useState('')

  const [Msg, setMsg] = useState("");
  const [DelChannel, setDelChannel] = useState('')

  
  return (
    <div className="main">
      <div className="container">
        {/* Sidebar  */}
        <div className='sidebar'>
      {/* NavBar */}
      <div className='navbar'>
      <span className='logo'>StarTalk</span>
      <div className='user'>
        <img src='https://preview.redd.it/6io8g1pmc1t91.png?width=640&crop=smart&auto=webp&s=cf0adb5abe4b90c90169cb2d620f75b36099772d'/> 
        <span id="username">Loading...</span>
        <button onClick = {() => navigate('/login')}>Logout</button>
        <button onClick = {() => navigate('/stats',{ state: {username: username} })}>STATS</button>
      </div>
      </div>

      {/* Chats */}
      <div className='chats'>
     {channelNames.map(name => (
        <div className='channels' key={name}>
          <img src='https://www.docker.com/wp-content/uploads/2021/10/Moby-logo-sm.png' onClick={() =>  {
           
           document.getElementById('channelName').innerHTML = name
           setTimeout(()=>{
            Name = name
            fetch('http://localhost:8080/receiveChannelName', {
                method: 'POST', 
                body: `name=${name}`,
                headers: {'Content-type': 'application/x-www-form-urlencoded'}
            })
            .then(response => response.json())
            .then(data => { 
              let messagesDiv = document.getElementById('messages');
              messagesDiv.innerHTML = '';
              data.forEach(item => {
                  let message = `${item.sender}: ${item.msg}`;
                  let messageElement = document.createElement('div');
                  messageElement.textContent = message;
                  messageElement.style.fontSize = '20px';
                  messageElement.style.marginBottom = '10px';
                  messageElement.style.clear = 'both'; // Clear float for next message element
                  
                  // Create custom images for upvote, downvote, and vote count
                  let upvoteImg = document.createElement('img');
                  upvoteImg.src = 'https://www.vhv.rs/dpng/d/445-4456459_reddit-clipart-icon-reddit-upvote-hd-png-download.png';
                  upvoteImg.style.width = '24px';
                  upvoteImg.style.height = '24px';
                  upvoteImg.style.marginRight = '20px';
                  upvoteImg.style.marginLeft = '50px';
                  upvoteImg.addEventListener('click', () => {
                      // Perform upvote action and update vote count
                      let voteCount = parseInt(voteCountElement.textContent);
                      voteCount++;
                      voteCountElement.textContent = voteCount;
                  });
                  
                  let downvoteImg = document.createElement('img');
                  downvoteImg.src = 'https://www.hubpng.com/files/preview/800x850/11674876644jy21vthpdsmeiryuuxadzefo7nhewznbzbxoyyxfh0z1rqpfgyd1bj9kcmum40wcimrnsssmkffqqeuz6qs0xq5356rlzoyylqko.png';
                  downvoteImg.style.width = '24px';
                  downvoteImg.style.height = '24px';
                  downvoteImg.style.marginLeft = '20px';
                  downvoteImg.addEventListener('click', () => {
                      // Perform downvote action and update vote count
                      let voteCount = parseInt(voteCountElement.textContent);
                      voteCount--;
                      voteCountElement.textContent = voteCount;
                  });

                  let commentImg = document.createElement('img');
                  commentImg.src = 'https://www.pngfind.com/pngs/m/247-2474217_png-file-svg-comment-icon-transparent-png.png';
                  commentImg.style.width = '24px';
                  commentImg.style.height = '24px';
                  commentImg.style.marginLeft = '20px';
                  commentImg.addEventListener('click', () => {
                    let message = `${item.sender}: ${item.msg}`; // Get the current message
                    let msgID = item.id
                    console.log(msgID)
                        
                    navigate(`/reply`, { state: { message: message , username: username, msgID: msgID} });
                  });

                  let deleteImg = document.createElement('img');
                  deleteImg.src = 'https://p1.hiclipart.com/preview/507/408/911/simple-rocket-dock-icons-trash2-full-gray-delete-icon.jpg';
                  deleteImg.style.width = '24px';
                  deleteImg.style.height = '24px';
                  deleteImg.style.marginLeft = '20px';
                  deleteImg.addEventListener('click', () => {
                    let id = item.id
                    if (username === 'admin'){
                      delMsg(id)
                    }else{
                      alert('Only admin can delete messages')
                    }
                  });
                  
                  let voteCountElement = document.createElement('span');
                  voteCountElement.textContent = '0';
                  
                  // Check if sender's name matches username
                  if (item.sender === username) {
                      messageElement.style.float = 'right'; // Float message element to right
                      
                      
                  } else {
                      // Add custom images and vote count to message element
                      messageElement.appendChild(upvoteImg);
                      messageElement.appendChild(voteCountElement);
                      messageElement.appendChild(downvoteImg);
                      messageElement.appendChild(commentImg);
                      messageElement.appendChild(deleteImg);
                  }
                  
                  messagesDiv.appendChild(messageElement);
                  messagesDiv.scrollTop = messagesDiv.scrollHeight
                  

              });
          })
            // .then(  setInterval(() =>{
            //   displayMsg(name)
            // },6000))
            .catch(error => console.error(error))
          }, 1000)
          }}/>
          <div className='channelsInfo'>
            <span className='channelName'>{name}</span>
          </div>
        </div>
      ))}
      
    </div>
    <div className='delbar'>
          <input id = 'delInput' className="delInput" placeholder="Enter name of Channel to delete"
          onChange={(e)=>{
            setDelChannel(e.target.value)}}
          ></input>
          <img src="https://p7.hiclipart.com/preview/56/35/808/computer-icons-delete-button.jpg"
          onClick={(e) => {
            if (username === 'admin'){
              fetch('http://localhost:8080/deleteChannel', {method: 'POST', body: `name=${DelChannel}`,
                headers: {'Content-type': 'application/x-www-form-urlencoded'}})
                .then(response => response.json())
                .then(alert(`Channel ${DelChannel} has just been deleted refresh page to see`))
                document.getElementById('delInput').value = ''

            }else{
              alert('Only admin can delete Channels')
            }

          }}
          ></img>
    </div>
    </div>
        
        
        
        
        
        {/* Chat */}
        <div className='chat'>
      <div className='chatInfo'>
        <span id='channelName'>SELECT / CREATE CHANNEL</span>
        <div className='chatIcon'>
          <input className='AddChanBar' type = 'text' placeholder="Enter new channel's name"
          onChange={(e)=>{
            setChannelName(e.target.value)
          }}/>
          <img className='channelIcon' src='https://cdn-icons-png.flaticon.com/512/1647/1647547.png'  onClick={(e) => {
              fetch('http://localhost:8080/addChannel', {method: 'POST', body: `name=${ChannelName}`,
              headers: {'Content-type': 'application/x-www-form-urlencoded'}})
              .then(response => response.json())
              .then(data => console.log(data))
              .then(alert(`Channel: ${ChannelName} has just been created`))
              .catch(error => console.error(error))
              }}/>
        </div>
      </div>
      {/* Messages */}
      <div id="messages" className='messages'>
        Please select a Channel
      </div>

      {/* Input */}
      <div className='input'>
      <input id="msgBar" className='msgBar' type = 'text' placeholder='please enter your message'
      onChange={(e)=>{
        setMsg(e.target.value)
      }}/>
      <button className='SendBtn'
      onClick={(e) => {
        
        fetch('http://localhost:8080/addMsg', {method: 'POST', body: `sender=${username}&msg=${Msg}`,
        headers: {'Content-type': 'application/x-www-form-urlencoded'}})
        .then(response => response.json())
        .then(data =>{
          let messagesDiv = document.getElementById('messages');
              messagesDiv.innerHTML = '';
              data.forEach(item => {
                  let message = `${item.sender}: ${item.msg}`;
                  let messageElement = document.createElement('div');
                  messageElement.textContent = message;
                  messageElement.style.fontSize = '20px';
                  messageElement.style.marginBottom = '10px';
                  messageElement.style.clear = 'both'; // Clear float for next message element
                  
                  // Create custom images for upvote, downvote, and vote count
                  let upvoteImg = document.createElement('img');
                  upvoteImg.src = 'https://www.vhv.rs/dpng/d/445-4456459_reddit-clipart-icon-reddit-upvote-hd-png-download.png';
                  upvoteImg.style.width = '24px';
                  upvoteImg.style.height = '24px';
                  upvoteImg.style.marginRight = '20px';
                  upvoteImg.style.marginLeft = '50px';
                  upvoteImg.addEventListener('click', () => {
                      // Perform upvote action and update vote count
                      let voteCount = parseInt(voteCountElement.textContent);
                      voteCount++;
                      voteCountElement.textContent = voteCount;
                  });
                  
                  let downvoteImg = document.createElement('img');
                  downvoteImg.src = 'https://www.hubpng.com/files/preview/800x850/11674876644jy21vthpdsmeiryuuxadzefo7nhewznbzbxoyyxfh0z1rqpfgyd1bj9kcmum40wcimrnsssmkffqqeuz6qs0xq5356rlzoyylqko.png';
                  downvoteImg.style.width = '24px';
                  downvoteImg.style.height = '24px';
                  downvoteImg.style.marginLeft = '20px';
                  downvoteImg.addEventListener('click', () => {
                      // Perform downvote action and update vote count
                      let voteCount = parseInt(voteCountElement.textContent);
                      voteCount--;
                      voteCountElement.textContent = voteCount;
                  });

                  let commentImg = document.createElement('img');
                  commentImg.src = 'https://www.pngfind.com/pngs/m/247-2474217_png-file-svg-comment-icon-transparent-png.png';
                  commentImg.style.width = '24px';
                  commentImg.style.height = '24px';
                  commentImg.style.marginLeft = '20px';
                  commentImg.addEventListener('click', () => {
                    let message = `${item.sender}: ${item.msg}`; // Get the current message
                    let msgID = item.id
                    console.log(msgID)
                        
                    navigate(`/reply`, { state: { message: message , username: username, msgID: msgID} });
                  });

                  let deleteImg = document.createElement('img');
                  deleteImg.src = 'https://p1.hiclipart.com/preview/507/408/911/simple-rocket-dock-icons-trash2-full-gray-delete-icon.jpg';
                  deleteImg.style.width = '24px';
                  deleteImg.style.height = '24px';
                  deleteImg.style.marginLeft = '20px';
                  deleteImg.addEventListener('click', () => {
                    let id = item.id
                    if (username === 'admin'){
                      delMsg(id)
                    }else{
                      alert('Only admin can delete messages')
                    }
                  });
                  
                  let voteCountElement = document.createElement('span');
                  voteCountElement.textContent = '0';
                  
                  // Check if sender's name matches username
                  if (item.sender === username) {
                      messageElement.style.float = 'right'; // Float message element to right
                      
                      
                  } else {
                      // Add custom images and vote count to message element
                      messageElement.appendChild(upvoteImg);
                      messageElement.appendChild(voteCountElement);
                      messageElement.appendChild(downvoteImg);
                      messageElement.appendChild(commentImg);
                      messageElement.appendChild(deleteImg);
                  }
                  
                  messagesDiv.appendChild(messageElement);
              });
        })
        .then(alert(`message sent`))
        .then(document.getElementById('msgBar').value = '')
        // .then(  setTimeout(() =>{
        //       displayMsg(Name)
        //     },6000))
        .catch(error => console.error(error))
        }
        
        }
          >Send</button>
      </div>
     
    </div>
      </div>
    </div>
  );
};

export default Main;
