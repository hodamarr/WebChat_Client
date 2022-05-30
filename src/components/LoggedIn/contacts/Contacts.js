import ContactItem from "./contactItem/ContactItem";
import { getNick } from "../../../users";
import { useState, useEffect } from "react";
import { getContacts, postContact , postInvetation} from '../../../api/api';

const defaultContact = {
    id: '',
    name: '',
    server: 'localhost:7266'
}

function Contacts(props) {
    const nick = getNick(props.user);
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState(defaultContact);
    const loadContacts = async () => {
        const response = await getContacts(props.user.name, props.user.server);
        setContacts(response || []);
    }

    useEffect(() => {
        if (props.user) {
            loadContacts();
        }
    }, [props.user, props.lastMessageID]);

    const addNewContact = () => {

        postContact(props.user.name, newContact, props.user.server)
            .then(() => {
                loadContacts();
            })
            .catch(e => console.error('faild to add new contact', e))
            .finally(() => {
                setNewContact(defaultContact)
            });
            postInvetation({from: props.user.name, to:newContact.name, server:newContact.server}, props.user.server);

            
    }

    return (
        <div style={{ padding: "5px"}}>
            <ul className="nav flex-column" >
                <span>
                    {nick}
                    <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{float:"right" }} > New + </button>
                </span>

                {contacts.map((contact, index) => <li key={index} className="nav-item"
                                                      style={{ lineHeight: "80px", borderBottomStyle:"solid", borderWidth:"2px", borderColor:"lightGray" }}>
                        <button className=" btn-secondary" style={{width:"100%", backgroundColor:"transparent", display:"flex", borderColor:"transparent"}}
                                onClick={() =>{props.onSelectedChat({...contact})}}>
                            <ContactItem {...contact}/>
                        </button>
                </li>)}
            </ul>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label>id</label>
                                    <input
                                        value={newContact.id}
                                        onChange={(e) => setNewContact({ ...newContact, id: e.target.value })}/>
                                    <label>name</label>
                                    <input
                                        value={newContact.name}
                                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}/>
                                    <label>server</label>
                                    <input
                                        value={newContact.server}
                                        onChange={(e) => setNewContact({ ...newContact, server: e.target.value })}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={addNewContact} data-bs-dismiss="modal">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
