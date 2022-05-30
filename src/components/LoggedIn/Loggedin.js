import Contacts from "./contacts/Contacts";
import "./Loggedin.css";
import NavBar from "./NavBar/NavBar";
import Chat from "./Chat/Chat";
import { useState, useEffect } from "react";
import { getContacts } from '../../api/api';

/*const useHub = () => {

    const subscriptions = {};

    const [ connection, setConnection ] = useState(null);
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7149/chatHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);
    
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    Object.entries(subscriptions).forEach(([messageName, fns]) => {
                        connection.on(messageName, message => {
                            fns.forEach(fn => fn());
                        })
                    });            
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const addSubscriber = (messageName, fn) => {
        if (subscriptions[messageName]) {
            subscriptions[messageName].push(fn);
        } else {
            subscriptions[messageName] = [fn];
        }
    }

    return { addSubscriber }
}*/

// load the conversations of current logged user
const func = async (props) => {
  const response = await fetch("chat_history/"+props.user+".json", {
      headers:
      {
          "Content-Type":"application/json",
          Accept:"application/json"
      }
  });
  const data = await response.json();
  return data.contacts;
}



function Loggedin(props) {

    const defaultContact={
        id:'', 
        name:'',
        server:''
    }
    const [selectedChat, setSelectedChat] = useState(defaultContact); // contains the contact id
    const [lastMessageID, setLastMessageID] = useState();
  
  return (
      <div className="container" style={{ padding: "0px" }}>
          <NavBar user={props}/>
          <div className="row" line-width="100%">
              <div className="col-3" style={{height:"100vh"}}>
                  <Contacts user={props.user} onSelectedChat={setSelectedChat} lastMessageID={lastMessageID}/>
              </div>
              <div className="col-9" style={{ borderLeftStyle: "solid", borderWidth: "2px", borderColor: "lightGray", height:"100vh",margin:"0px" }}>
                  {props.user && selectedChat && <Chat contactID={selectedChat.id} contactName={selectedChat.name} user={props.user} onNewMessage={setLastMessageID}/>}
              </div>
          </div>
      </div>
  );
}

export default Loggedin;