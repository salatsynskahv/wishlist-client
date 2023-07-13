import React from 'react';
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UpdateProfile from "./component/pages/auth/UpdateProfile";
import Friends from "./component/pages/friends/Friends";
import MyWishlists from "./component/pages/mywishlist/MyWishlists";
import CustomTable from "./component/pages/mywishlist/common/CustomTable";
import Signup from "./component/pages/auth/Signup";
import Login from "./component/pages/auth/Login";
import ForgotPassword from "./component/pages/auth/ForgotPassword";
import Logout from "./component/pages/auth/Logout";
import Home from "./component/pages/Home";
import {Provider} from "react-redux";
import store from "./redux/store";
import ShareWishlist from "./component/pages/ShareWishlist";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path='/update-profile' element={<UpdateProfile/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path='/wishlist' element={<MyWishlists/>}>
            <Route path='/wishlist/:wishListId' element={<CustomTable/>}/>
        </Route>
        <Route path='/share-wishlist/:wishlistId' element={<ShareWishlist/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/logout' element={<Logout/>}/>
    </Route>
));


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
