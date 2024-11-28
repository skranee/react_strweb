import {observer} from "mobx-react-lite";
import Navigation from "./components/navigation/navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Auth from "./pages/auth/auth.jsx";
import {useContext, useEffect} from "react";
import {Context} from "./context/context.js";
import Reviews from "./pages/reviews/reviews.jsx";
import Home from "./pages/home/index.jsx";
import Products from "./pages/products/products.jsx";

function App() {
    const {store} = useContext(Context)

    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [store])

    return (
        <>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/products' element={<Products />} />
            </Routes>
        </>
    )
}

export default observer(App);
