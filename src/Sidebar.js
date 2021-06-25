import React, { useEffect, useState }  from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Sidebar_chat from './Sidebar_chat.js';
import db from './firebase.js';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [{user},dispatch] = useStateValue();
    const [rooms,setRooms] = useState([]);
    useEffect( ()=>{
        db.collection("rooms").onSnapshot(snapshot =>{
            setRooms(snapshot.docs.map(doc=>{
                return{
                    "id":doc.id,
                    "data":doc.data()
                }
            }))
        })
    },[])
    return (
        <div className="sidebar style1">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_header_right">
                <IconButton aria-label="stories">
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton aria-label="stories">
                    <ChatIcon/>
                </IconButton>
                <IconButton aria-label="stories">
                    <MoreVertIcon/>
                </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchinput">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <input type="text" placeholder="Search chats"/>
                </div>
            </div>

            <div className="sidebar_chatbox">
               
                <Sidebar_chat addNewChat/>
                {rooms.map(room=>{
                    return <Sidebar_chat key={room.id} id={room.id} name={room.data.name} />
                })}


            </div>
        </div>
    )

}
 
export default Sidebar;
