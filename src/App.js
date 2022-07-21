import './App.css';
import Navbar from "./component/Navbar";
import MyWishlists from "./component/pages/MyWishlists";
import Friends from "./component/pages/Friends";
import {Route, Routes} from "react-router-dom";
import Home from "./component/pages/Home";
import styled from "styled-components"
import WishList from "./component/pages/WishList";

const StyledContainer = styled.div`
    height: 100vw; 
    padding: 20px;
    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    color: #171212;
`;


function App() {

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path="/wishlist" element={<MyWishlists/>}/>
                <Route path="/wishlist/:wishListId" element={<WishList/>}/>
            </Routes>
        </div>
    );
}

export default App;
