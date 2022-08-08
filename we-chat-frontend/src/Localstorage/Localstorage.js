import React ,{useState,useEffect} from 'react';
import './Localstorage.css';
import {Link} from 'react-router-dom'


function Localstorage() {

  const [currentUser, setCurrentUser] = useState([]);

  const handle=()=>{
    localStorage.setItem("currentUser",currentUser)
  }
  

  return (
    <div className='container'>
      <div className='card p-5 mt-2'>
        <h1 className='text-center'>Current User</h1>
        <input className='input_text w-100 mt-2' type="text" placeholder='Enter Current User...'
        onChange={(e)=>setCurrentUser(e.target.value)}/><br/>
        <Link to="/auth">
        <button className='btn btn-primary w-100 mt-2' onClick={handle}>Send</button>
        </Link>
      </div>

     
    </div>
  )
}

export default Localstorage