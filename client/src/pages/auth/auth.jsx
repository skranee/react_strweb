import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../context/context.js";
import './auth.css';

function Auth() {
    const {store} = useContext(Context)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleReg = async () => {
        await store.registration(username, password);
    }

    const handleLogin = async () => {
        await store.login(username, password);
    }

    return (
        <div className='authWindow'>
            <input
                type='text'
                className='authInput'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='password'
                className='authInput'
                placeholder='Passowrd'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className='authBtn'
                onClick={() => handleLogin()}
            >
                Login
            </button>
            <button
                className='authBtn'
                onClick={() => handleReg()}
            >
                Registration
            </button>
        </div>
    )
}

export default observer(Auth);
