import React, { useEffect, useState } from "react";


import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomeLink from "./CumtomeLink";
import { useNavigate } from "react-router-dom";


function Sidebar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const [user , setUser] = useState({});

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:3003/${localStorage.getItem('id')}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const res = await response.json();
              setUser(res);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();        
  }, [])

  
  return (

    <div className="sidebar" >
      <CustomeLink to='/Home'>
        <SidebarOptions active Icon={HomeIcon} text="Home" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={SearchIcon} text="Explore" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={ListAltIcon} text="Lists" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
      </CustomeLink>
      <CustomeLink to='/Home'>
        <SidebarOptions Icon={MoreIcon} text="More" />
      </CustomeLink>
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      <div className="Profile__info">
        <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"/>
        <div className="user__info">
          <h4>
              {user.userName}
          </h4>
          <h5>
            {user.userEmail}
          </h5>
        </div>
        <IconButton size="small"
          sx={{ ml: 2 }} aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
         ><MoreHorizIcon /></IconButton>
        <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu}>
          <MenuItem className="Profile__info1" onClick={() => navigate('/home/profile')}>
            <Avatar src= "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"/>
            <div className="user__info subUser__info">
              <div>
              <h4>"abc" 
             
          </h4>
          <h5>
             @abc
          </h5>
              </div>
              <ListItemIcon className="done__icon" color="blue"><DoneIcon /></ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem >Add an existing account</MenuItem>
          <MenuItem >Log out "@abc" </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Sidebar;