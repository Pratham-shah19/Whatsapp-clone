import { Avatar,IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase.js';
import './Chat.css';
import { useStateValue } from './StateProvider.js';
import firebase from 'firebase';



function Chat() {
    const [{user},dispatch] = useStateValue();
    const { roomID } = useParams();
    const [roomName,setName] = useState("");
    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const [messages,setMessage] = useState([]);

    const element = document.querySelector(".chat_body");
    const message = (e)=>{
        e.preventDefault();
        if(input){
        db.collection("rooms").doc(roomID).collection("messages").add({
            message: input,
            name : user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })}
        setInput("");
    };
    const inputchange = (e)=>{
        setInput(e.target.value);
    }

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500));
    },[roomID])

    useEffect(()=>{
        if(roomID){
            db.collection("rooms").doc(roomID).onSnapshot(snapshot =>{
                setName(snapshot.data().name)
            })

        }
        db.collection('rooms').doc(roomID).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot =>{
            setMessage(snapshot.docs.map((doc) =>{return(doc.data())} ))
                
        })
       // element.scrollTop = element.scrollHeight;
        
    },[roomID])

    


    return (
        <div className="chat style2">
            <div className="chat_header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_info">
                    <h2>{roomName}</h2>
                    <p>last seen{" "}                                          
                    {
                        new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                    }
                        
                    </p>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    <IconButton onClick={message}>
                        <AttachFileIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) =>
                {return(
                        <p className={`message ${message.name === user.displayName &&"chat_receiver"}`}>
                        {message.message}
                            <span className="chat_name">
                                {message.name}
                            </span>
                            <span className="chat_timestamp">
                                {message.timestamp?.toDate().toUTCString()}
                            </span>
                        {console.log(element.scrollTop = element.scrollHeight)}

                        </p>
                        )
                        
                    })
                    
                }
                   
                  


            </div>

            <div className="chat_bottom">

                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <div className="chat_bottom_input">
                    <form>
                        <input type="text" value={input} onChange={inputchange} placeholder="Enter your text here"/>
                        <button type="submit" onClick={message}>submit</button>
                    </form>
                </div>
                <IconButton>
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
