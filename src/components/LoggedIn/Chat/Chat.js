import MessageItem from "./MessageItem/MessageItem";
import "./Chat.css"
import { useEffect, useState } from 'react';
import { getContact, getMessages, postInvetation, sendMessage, TransferMessage } from '../../../api/api';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Chat(props) {

    const [contact, setContact] = useState();
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');

    const [ connection, setConnection ] = useState(null);
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7149/hubs/chat')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
   }, []);
    
    useEffect(() => {
        if (connection != null) {
            connection.start()
                .then(() => {
                    connection.on('Recieve', async(scrId, destId) => {
                        if(destId === props.user.name){
                            console.log("im on recive");
                            getContactMessages(props.contactID, props.user.name, props.user.server)
                        }
                    })           
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);


   function onSend() {

        if (msg) {
            sendMessage(props.contactName, props.user.name, {content: msg}, props.user.server)
                .then(() => {
                    getContactMessages(props.contactID, props.user.name, props.user.server)
                    setMsg('');
                    TransferMessage(props.contactID, {from: props.user.name, to:props.contactID ,content:msg}, props.user.server);
                    connection.invoke('Send', props.user.name, props.contactName);
                }).catch(e => console.error('failed to send message', e));
        }
    }

    const getContactName = async (contactID) => {
        getContact(contactID, props.user.name, props.user.server)
            .then(data => setContact(data))
            .catch(e => console.error('failed to get contact info', e));
    }

    const getContactMessages = async (contactID) => {
        getMessages(contactID,props.user.name, props.user.server)
            .then(data => {
                if (data) {
                setMessages(data);
                if (data[data.length - 1]) {
                    props.onNewMessage(data[data.length - 1].id);
                }
            }
        }).catch(e => console.error(`failed to get messages for ${contactID}`, e));
    }

    useEffect(() => {
        getContactName(props.contactID);
        getContactMessages(props.contactID)
    }, [props.contactID])

    const shouldDisplayPicture = (index) => {
        if (index > 0) {
            return messages[index].self !== messages[index-1].self;
        }
        return true;
    };

    return (
        <div className="container" style={{ display: "flex", padding: "0px", marginTop: "20px", height: "100%" }}>
            <div className="col" >
                {/*messages history*/}
                <div className="row" id="scrollable"  style={{ display: "flex", alignSelf: "flex-start", height: "80%", overflowY: "scroll" }} >
                    <h4> {contact && contact.name ? contact.name : props.contactID}</h4>
                    <ul className="nav flex-column">
                        {messages.map((message, index) => <li key={index} className="nav-item" style={{ lineHeight: "20px" }}>
                            <MessageItem {...message} user={props.user} showPicture={shouldDisplayPicture(index)}/>
                        </li>)}
                    </ul>
                </div>
                {/*writing panel*/}
                <div className="row" style={{ display: "flex", alignSelf: "flex-end" }} >
                    <nav className="navbar navbar-light bg-light" style={{width:"73vw", paddingRight:0}}>
                        <div className="container-fluid">
                            <div className="row g-3">
                                <div className="col-auto">
                                    <input placeholder="Write Here..." style={{ width: "60vw" }} value={msg} onChange={e => setMsg(e.target.value)}/>
                                </div>
                                <div className="col-auto">
                                    <button type="button" onClick={() => onSend()} className="btn btn-primary mb-3">Send</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
             </div>
        </div>
    );
}

export default Chat;
