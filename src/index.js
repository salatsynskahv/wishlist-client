import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.scss';
import UpdateProfile from "./component/pages/auth/UpdateProfile";
import Friends from "./component/pages/friends/Friends";
import MyWishlists from "./component/pages/mywishlist/MyWishlists";
import CustomTable from "./component/pages/common/CustomTable";
import Signup from "./component/pages/auth/Signup";
import Login from "./component/pages/auth/Login";
import ForgotPassword from "./component/pages/auth/ForgotPassword";
import Logout from "./component/pages/auth/Logout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
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
                element: <MyWishlists/>
            },
            {
                path: '/wishlist/:wishListId',
                element: <CustomTable/>
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
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
