import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "./AuthContext";
import { Button, Drawer } from "@mui/material";

const Sidebar = ({ open, onClose }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  return (
    <Drawer
      sx={{
        width: "250px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "250px",
          boxSizing: "border-box",
        },
      }}
      className='sidebar-menu'
      anchor='left'
      open={open}
      onClose={onClose}
      variant='persistent'
    >
      <div className='sidebar-inner-wrap'>
        <div className='side-menu-list'>
          <div className='menu-item'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <HomeIcon />
              Home
            </NavLink>
          </div>
          {isLoggedIn ? (
            <div>
              <div className='menu-item'>
                <NavLink
                  to='/cart'
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                >
                  <ShoppingCartIcon />
                  cart
                </NavLink>
              </div>
              <div className='menu-item'>
                <NavLink
                  to='/Profile'
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                >
                  <PersonIcon />
                  Profile
                </NavLink>
              </div>
              <div className='menu-item'>
                <Button
                  className='sidebar-link'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(false);
                    onClose();
                  }}
                >
                  <LogoutIcon />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className='menu-item'>
              <NavLink to='/login'>
                <LoginIcon />
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
