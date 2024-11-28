import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Context} from "./context/context.js";
import store from "./context/context.js";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Context.Provider value={{store}}>
            <GoogleOAuthProvider clientId="365736856213-4lktcjcf5e19jtkqc420olpaea5vctf5.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </Context.Provider>
    </BrowserRouter>
)
