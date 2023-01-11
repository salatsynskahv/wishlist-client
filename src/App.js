import './App.scss';
import Navbar from "./component/Navbar";
import {AuthProvider} from "./contexts/AuthContext";
import React from "react";
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/store";

function App() {

    return (
        <div className="App">
            <AuthProvider>
                <Provider store={store}>
                    <Navbar/>
                    <Outlet/>
                </Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
