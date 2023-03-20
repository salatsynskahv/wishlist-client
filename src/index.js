import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import UpdateProfile from "./component/pages/auth/UpdateProfile";
import Friends from "./component/pages/friends/Friends";
import MyWishlists from "./component/pages/mywishlist/MyWishlists";
import CustomTable from "./component/pages/common/CustomTable";
import Signup from "./component/pages/auth/Signup";
import Login from "./component/pages/auth/Login";
import ForgotPassword from "./component/pages/auth/ForgotPassword";
import Logout from "./component/pages/auth/Logout";
import Home from "./component/pages/Home";
import {Provider} from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/update-profile',
                element: <UpdateProfile/>
            },
            {
                path: '/friends',
                element: <Friends/>
            },
            {
                path: '/wishlist',
                element: <MyWishlists/>,
                children: [
                    {
                        path: '/wishlist/:wishListId',
                        element: <CustomTable/>
                    }
                ]
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: '/logout',
                element: <Logout/>
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
