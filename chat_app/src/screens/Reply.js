import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import "./Reply.css"

const Reply = () => {
    const navigate = useNavigate()
    const {state} = useLocation();
    var username
    var msgID


    setTimeout(function(){
        document.getElementById("repMsg").innerHTML = `REPLYING TO: "${state['message']}"`;
        username = state['username']
        msgID = state ['msgID']
    }, 100);

    function delRep(id){
        fetch('http://localhost:8080/deleteRep', {
            method: 'POST', 
            body: `id=${id}`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        })
        .then(response => response.json())
        .then(data => { console.log(data['message']) })
        .then(alert("Message has just been deleted, refresh the page to see"))
    }
    function showRep(){

    fetch('http://localhost:8080/showRep', {method: 'POST', body: `msgid=${msgID}`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'}})
            .then(response => response.json())
            .then(data =>{
                
                if (data.length === 0){
                    document.getElementById('replies').innerHTML = 'EMPTY'
                }else{

                    let messagesDiv = document.getElementById('replies');
                        messagesDiv.innerHTML = '';
                        data.forEach(item => {
                            let message = `${item.sender}: ${item.reply}`;
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
                            let deleteImg = document.createElement('img');
                          deleteImg.src = 'https://p1.hiclipart.com/preview/507/408/911/simple-rocket-dock-icons-trash2-full-gray-delete-icon.jpg';
                          deleteImg.style.width = '24px';
                          deleteImg.style.height = '24px';
                          deleteImg.style.marginLeft = '20px';
                          deleteImg.addEventListener('click', () => {
                            let id = item.id
                            if (username === 'admin'){
                              delRep(id)
                              alert('Reply has just been deleted refresh screen to see')
                            }else{
                              alert('Only admin can delete replies')
                            }
                          });
                            
                            let voteCountElement = document.createElement('span');
                            voteCountElement.textContent = '0';
                            
                            // Check if sender's name matches username
                            if (item.sender === username) {
                                messageElement.style.float = 'left'; // Float message element to right
                                
                                
                            } else {
                                // Add custom images and vote count to message element
                                messageElement.appendChild(upvoteImg);
                                messageElement.appendChild(voteCountElement);
                                messageElement.appendChild(downvoteImg);
                                messageElement.appendChild(deleteImg);
                            }
                            
                            messagesDiv.appendChild(messageElement);
                        });
                }
            })
            
            .then(document.getElementById('msgBar').value = '')
            // .then(  setTimeout(() =>{
            //       displayMsg(Name)
            //     },6000))
            .catch(error => console.error(error))

}      
        
    
    const [Reply, setReply] = useState("");

  return (
    <div className='replyContainer'>
        <div className='repChat'>
            {/* repMsg */}
            <div className='repMsg'>
                <span id='repMsg'>Loading..</span>
                <div className='chatIcon'>
                    <button className='showRepBtn' onClick={() => showRep()}>Show Replies</button>
                    <img className='backIcon' src= 'https://image.pngaaa.com/443/3944443-middle.png' onClick={() => navigate('/main', { state: { username: username} })}></img>
                </div>
            </div>
            {/* replies */}
            <div className='replies'>
                <span id='replies'>Please click show replies</span>
            </div>
            {/* Input */}
            <div className='input'>
            <input id="msgBar" className='msgBar' type = 'text' placeholder='please enter your reply'
            onChange={(e)=>{
                setReply(e.target.value)
            }}/>
            <button className='SendBtn'
            onClick={(e) => {
        
                fetch('http://localhost:8080/addRep', {method: 'POST', body: `sender=${username}&reply=${Reply}&msgid=${msgID}`,
                headers: {'Content-type': 'application/x-www-form-urlencoded'}})
                .then(response => response.json())
                .then(data =>{
                  let messagesDiv = document.getElementById('replies');
                      messagesDiv.innerHTML = '';
                      data.forEach(item => {
                          let message = `${item.sender}: ${item.reply}`;
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
                          let deleteImg = document.createElement('img');
                          deleteImg.src = 'https://p1.hiclipart.com/preview/507/408/911/simple-rocket-dock-icons-trash2-full-gray-delete-icon.jpg';
                          deleteImg.style.width = '24px';
                          deleteImg.style.height = '24px';
                          deleteImg.style.marginLeft = '20px';
                          deleteImg.addEventListener('click', () => {
                            let id = item.id
                            console.log(id)
                            if (username === 'admin'){
                              delRep(id)
                              alert('Reply has just been deleted refresh screen to see')
                            }else{
                              alert('Only admin can delete replies')
                            }
                          });
                          
                          let voteCountElement = document.createElement('span');
                          voteCountElement.textContent = '0';
                          
                          // Check if sender's name matches username
                          if (item.sender === username) {
                              messageElement.style.float = 'left'; // Float message element to right
                              
                              
                          } else {
                              // Add custom images and vote count to message element
                              messageElement.appendChild(upvoteImg);
                              messageElement.appendChild(voteCountElement);
                              messageElement.appendChild(downvoteImg);
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
      
  )
}

export default Reply