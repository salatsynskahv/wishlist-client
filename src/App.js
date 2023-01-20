import './App.scss';
import Navbar from "./component/Navbar";
import {AuthProvider} from "./contexts/AuthContext";
import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/store";
import Home from "./component/pages/Home";

function App() {
    const location = useLocation();
    console.log('location: ' + JSON.stringify(location))

    return (
        <div className="App">
            <AuthProvider>
                <Provider store={store}>
                    <header>
                        <Navbar/>
                    </header>
                    {
                        location.pathname === '/' && <Home/>
                    }
                    {   location.pathname !== '/' && <Outlet/>
                    }
                    <footer className="footer">
                        <div>All rights reserved</div>
                    </footer>
                </Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
