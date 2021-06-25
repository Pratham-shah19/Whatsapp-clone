import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login.js'
import { useStateValue } from './StateProvider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';


function App() {
  const [{user}, dispatch] = useStateValue();
  const showSidebar = ()=>{
    let sidebarel = document.querySelector(".sidebar");
    let chatel = document.querySelector(".chat");

    if(sidebarel.classList.contains("style1"))
    {
        sidebarel.classList.remove("style1");
        sidebarel.classList.add("show1");

        chatel.classList.remove("style2");
        chatel.classList.add("show2");
     }
    else
    {
        sidebarel.classList.remove("show1");
        sidebarel.classList.add("style1");

        chatel.classList.remove("show2");
        chatel.classList.add("style2");
        // console.log(sidebarel.classList);

    }
};
  return (
    <div className="app">
    {!user ?<Login/>:
        (
          
          <div className="app_body">
              <IconButton className="control_sidebar" onClick={showSidebar}><ExpandMoreIcon/></IconButton>

            <Router>
                <Sidebar/>
                <Switch>
                  <Route path="/rooms/:roomID">
                    <Chat/> 
                  </Route>
                  <Route path="/">
                    <Chat/>
                  </Route>
                </Switch>
            </Router>
          </div>
      
      )
    }
    </div>
  )
}

export default App;
