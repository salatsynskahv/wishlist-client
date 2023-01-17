import './App.scss';
import Navbar from "./component/Navbar";
import {AuthProvider} from "./contexts/AuthContext";
import React from "react";
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/store";
import Home from "./component/pages/Home";

function App() {

    return (
        <div className="App">
            <AuthProvider>
                <Provider store={store}>
                    <header>
                        <Navbar/>
                    </header>
                    <Outlet/>
                    <footer className="footer">
                        <div>All rights reserved</div>
                    </footer>
                </Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
