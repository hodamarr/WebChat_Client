import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { is_Exist } from '../../users'
import { getContact, isLogin } from '../../api/api';

const defaultContact = {
    UserName: 'lidoro',
    password: 'a1234567',
    server: 'localhost:7149'
}

function LogInScreen(props) {
    const [user, setUser] = useState(defaultContact);
    const [userErrMsg, setUserErrMsg] = useState('');
    const [passErrMsg, setPassErrMsg] = useState('');
    const navi = useNavigate();
    // Username consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase.
    // Username allowed of the dot (.), underscore (_), and hyphen (-).
    // The dot (.), underscore (_), or hyphen (-) must not be the first or last character.
    // The dot (.), underscore (_), or hyphen (-) does not appear consecutively, e.g., java..regex
    // The number of characters must be between 5 to 20.

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameregex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
        if (!nameregex.test(user.UserName)) { setUserErrMsg("username should contain 5-20 chars") }

        const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        // minimum 8 chars, one letter one number.
        if (!passwordregex.test(user.password)) { setPassErrMsg("password should contain 8 chars, at least one letter and one number") }

        if (!userErrMsg && !passErrMsg) {
          isLogin(user,`https://${user.server}`)
          .then(() => {                
            props.setUser({name: user.UserName, server: `https://${user.server}`});
            navi('/chats');
          })
          .catch((e) => {console.error("error with login", e)
          setPassErrMsg("one or more fields are incorrect!")});
        }
    }

    return (
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
            <div className="card" style={{ width: '600px', display: 'flex', marginRight: '10px' }}>
                <div className="card-body">
                    <h1 className="card-title">
                        Welcome Back
                        <span id="dot">.</span>
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <span className="card-subtitle mb-2 text-muted" style={{ marginRight: '5px' }}>Not A Member?</span>
                        <Link to="/register" className="card-link" id="login">Sign Up</Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder="User Name"
                                onChange={(e) => setUser({ ...user, UserName: e.target.value })}
                                value={user.UserName}
                                required />
                            <span>{userErrMsg}</span>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder='Password'
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                                required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder='Server'
                                onChange={(e) => setUser({ ...user, server: e.target.value })}
                                value={user.server}
                                required />
                                <span>{passErrMsg}
                                </span>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogInScreen;
