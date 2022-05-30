import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { putContact, getContact, getUser, postUser } from '../../api/api';

const defaultContact = {
    name: '',
    nick: '',
    password: '',
    server: ''
}

function CreateNew(props) {
    const [newUser, setNewUser] = useState(defaultContact);
    const [userErrMsg, setUserErrMsg] = useState('');
    const [nickErrMsg, setNickErrMsg] = useState('');
    const [passErrMsg, setPassErrMsg] = useState('');
    const navigator = useNavigate();

    // Username consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase.
    // Username allowed of the dot (.), underscore (_), and hyphen (-).
    // The dot (.), underscore (_), or hyphen (-) must not be the first or last character.
    // The dot (.), underscore (_), or hyphen (-) does not appear consecutively, e.g., java..regex
    // The number of characters must be between 5 to 20.

    const handleSubmit = async (e) => {
        e.preventDefault();
        var x = false;

        const nameregex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
        if (!nameregex.test(newUser.name)) { 
            setUserErrMsg("username should contain 5-20 chars!")
            x = true
        }

        const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordregex.test(newUser.password)) { 
            setPassErrMsg("password should contain 8 chars, at least one letter and one number") 
            x = true
        }

        // should check if this username exist in DB
        const isExist = await getUser(newUser.name, `https://${newUser.server}`);
        if (isExist !== undefined) {
            setUserErrMsg("This Username is already taken!")
            x = true;
        }

        if (x === false) {
            postUser(newUser,`https://${newUser.server}`)
            props.setUser({name: newUser.name, server: `https://${newUser.server}`});
            navigator("/chats");
        }
    }

    return (
        <section>
            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
                <div className="card" style={{ width: '600px', display: 'flex', marginRight: '10px' }}>
                    <div className="card-body">
                        <h1 className="card-title">Create New Account</h1>
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                            <span className="card-subtitle mb-2 text-muted" style={{ marginRight: '5px' }}>Already A Member?</span>
                            <Link to="/" className="card-link" id="login">Log In</Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="User Name"
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    value={newUser.name} required></input>
                                <span>{userErrMsg}</span>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    value={newUser.password} required />
                                <span>{passErrMsg}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Nick Name"
                                    onChange={(e) => setNewUser({ ...newUser, nick: e.target.value })}
                                    value={newUser.nick} required />
                                <span>{nickErrMsg}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Server"
                                    onChange={(e) => setNewUser({ ...newUser, server: e.target.value })}
                                    value={newUser.server} required />
                            
                            </div>
                            <button type="submit" className="btn btn-primary" id="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateNew;