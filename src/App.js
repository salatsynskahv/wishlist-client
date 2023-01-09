import './App.scss';
import Navbar from "./component/Navbar";
import MyWishlists from "./component/pages/mywishlist/MyWishlists";
import Friends from "./component/pages/friends/Friends";
import {Route, Routes} from "react-router-dom";
import Home from "./component/pages/Home";
import Login from "./component/pages/auth/Login";
import Signup from "./component/pages/auth/Signup";
import {AuthProvider} from "./contexts/AuthContext";
import React from "react";
import PrivateRoute from "./component/PrivateRoute";
import ForgotPassword from "./component/pages/auth/ForgotPassword";
import UpdateProfile from "./component/pages/auth/UpdateProfile";
import CustomTable from "./component/pages/common/CustomTable";
import Logout from "./component/pages/auth/Logout";
import Planner from "./component/pages/planner/Planner";
import ErrorPage from "./component/pages/error/Error";


function App() {

    return (
        <div className="App">
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route exact path="/" element={<Home/>} errorElement={<ErrorPage/>}/>
                        <Route exact path="/" element={<PrivateRoute/>}>
                            <Route exact path="/update-profile" element={<UpdateProfile/>}/>
                        </Route>
                        {/*<Route exact path="/" element={<PrivateRoute/>}>*/}
                            {/*<Route exact path="/planner" element={<Planner/>}/>*/}
                        {/*</Route>*/}
                        <Route exact path="/" element={<PrivateRoute/>}>
                            <Route path="/friends" element={<Friends/>}/>
                        </Route>
                        <Route exact path="/" element={<PrivateRoute/>}>
                            <Route path="/wishlist" element={<MyWishlists/>}>
                                <Route index path=":wishListId" element={<CustomTable/>}/>
                            </Route>
                        </Route>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Routes>
                </AuthProvider>
        </div>
    );
}

export default App;
