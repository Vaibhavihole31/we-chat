
import ReceivedMessage from "./../ReceivedMessage/ReceivedMessage";
import SentMessage from "./../SendMessage/SendMessage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Auth.css";

function Auth() {
    const [data, setData] = useState([]);

    const [currentUser, setCurrentUser] = useState("");
  
    const [currentMessage, setCurrentMessage] = useState("");
  
    const [fetchTrigger, setFetchTrigger] = useState(false);

    useEffect(()=>{
        async function fetchData(){
          const response = await axios.get("/message");
          setData(response.data);
        }
        fetchData();
      }, [fetchTrigger]);

      useEffect(()=>{
        const storedUser = localStorage.getItem("currentUser")
        setCurrentUser(storedUser)
      }, [])
     
      function sendMessage()
      {
        axios.post("/message", {
          user: currentUser,
          messageType: "text",
          messageBody: currentMessage
        });
    
        setCurrentMessage("");
    
        setFetchTrigger(!fetchTrigger);
    
      }
    
  return (
   <>
   <div className="chat-container">
      <h2 className='text-center'>We Chat </h2>
      <div className='chat-container'>
        
        {

          data.map((obj, i)=>{
            if(obj.user===currentUser)
            {
              return(
                <SentMessage key={i} message={obj.messageBody}/>
              )
            }
            else
            {
              return(
                <ReceivedMessage key={i}  user={obj.user} message={obj.messageBody}/>
              )
            }
            
          })
        }
      </div>
     
      <div className='myclass mt-5'>
        <center><b><br/>current user:</b> {currentUser}</center>

        <center><input className='text-center' type="text"  placeholder="Enter Username"
          onChange={(e)=>{ currentUser (e.target.value)}}/>
          {/* <div>{localStorage.getItem("currentUser")}</div> */}
         </center>

        <center><input className='text-center'type="text"  placeholder="Enter message"
          value={currentMessage}
          onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
           <br /><br /></center>

        <center><button  onClick={sendMessage}>Send</button></center>
      </div>
      </div>
   </>
  )
}

export default Auth