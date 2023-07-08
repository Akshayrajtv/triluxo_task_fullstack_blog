import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
   
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                {/* <Sidebar /> */}
            </div>
        </>
    );
};

export default Home;
