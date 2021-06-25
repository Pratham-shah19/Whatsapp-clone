import { Avatar } from '@material-ui/core';
import React, { useEffect,useState } from 'react';
import './Sidebar_chat.css';
import {Link} from 'react-router-dom';
import db from './firebase';

function Sidebar_chat({key,id,name,addNewChat}) {
    const [messages,setMessage] = useState([]);

    useEffect(()=>{
        if(id){
        db.collection("rooms").doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot =>{
            setMessage(snapshot.docs.map(doc =>{return(doc.data())}))
        })}
    },[id])
    const [seed,setSeed] = useState("");
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500));
    },[])
    const createchat = ()=>{
        const roomName = prompt("enter the name of the room");
        db.collection("rooms").add({name:roomName});

    }
    return (!addNewChat?(
        <Link to={`/rooms/${id}`}>
            <div className="sidebar_chat">   
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
                <div className="sidebar_chat_info">    
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>      
                </div>
            </div>
        </Link>
    ):( <div className="sidebar_chat" onClick={createchat}>
            <h2>Add new chat</h2>
         </div>))
       
}

export default Sidebar_chat
