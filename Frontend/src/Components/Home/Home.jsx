import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import {
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
import Sidebar from '../Sidebar/Sidebar';
import Widgets from "../Widgets/Widgets";


const Home = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        
    };
    return (
        <div className="app">
            <div className="container" style={{margin:'0px'}}>
                <div className="row">
                    <div className="col-3"><Sidebar/></div>
                    <div className="col-9"><Widgets /></div>
                </div>
            </div>
        </div>
    );
};

export default Home;