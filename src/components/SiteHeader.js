import { Box, Container, Menu, MenuItem } from "@mui/material";
import React from "react";
import CustomIconButton from "./CustomIconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "./CustomButton";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import siteLogo from "../assets/images/site-logo.svg";

const SiteHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className='site-header'>
      <Container maxWidth='lg'>
        <Box className='header-inner-wrap'>
          <CustomIconButton
            icon={MenuIcon}
            color='#fff'
            className='white-icon-btn side-menu-btn'
            onClick={toggleSidebar}
          ></CustomIconButton>
          <Box className='logo-block'>
            <h1>
              <Link to='/'>
                <img src={siteLogo} alt='Logo' />
              </Link>
            </h1>
          </Box>
          {isLoggedIn ? (
            <Box className='profile-block'>
              <CustomIconButton
                icon={ShoppingCartIcon}
                id='cart-button'
                // onClick={handleClick}
                component={RouterLink}
                to='/cart'
                className='white-icon-btn user-profile-btn'
              ></CustomIconButton>
              <CustomIconButton
                icon={AccountCircleIcon}
                id='basic-button'
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className='white-icon-btn user-profile-btn'
              ></CustomIconButton>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/change-password");
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <CustomButton
              varient='outlined'
              className='btn secondary-btn'
              component={RouterLink}
              to='/login'
            >
              Login
            </CustomButton>
          )}
        </Box>
      </Container>
    </header>
  );
};

export default SiteHeader;
