import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import './navigation.css';
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context/context.js";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

function Navigation() {
    const { store } = useContext(Context);

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const btnText = store.isAuth ? 'Logout' : 'Login';

    const handleLogin = () => {
        window.location.replace('http://localhost:5173/auth')
    }

    const handleLogout = () => {
        store.logout()
    }

    return (
        <div className='navigation'>
            <Link to='/' className='navLink'>Home</Link>
            <Link to='/products' className='navLink'>Products</Link>
            <Link to='/reviews' className='navLink'>Reviews</Link>
            <Link to='/admin' className='navLink'>Admin Panel</Link>
            <button
                className='logBtn'
                onClick={() => store.isAuth ? handleLogout() : handleLogin()}
            >
                {btnText}
            </button>
            {/*<GoogleLogin*/}
            {/*    onSuccess={handleSuccess}*/}
            {/*    onError={() => console.error('Error')}*/}
            {/*/>*/}
            <div>
                {profile ? (
                    <div>
                        <img src={profile.picture} alt="user image"/>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br/>
                        <br/>
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
            </div>
        </div>
    );
}

export default observer(Navigation);
