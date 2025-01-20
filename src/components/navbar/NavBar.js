

import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { Link,useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file
import Box from "@mui/material/Box";
import {ShoppingCart} from "@mui/icons-material";

const NavBar = ({ isLoggedIn, isAdmin, onLogout, onSearch }) => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    onLogout(); // Call the passed onLogout prop (possibly clears user data or token)
    navigate('/login'); // Redirect to login page
  };


  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
      event.target.value = ''; // Clear input after search
    }
  };
 
 

console.log("nav"+isAdmin);
  return (
    <AppBar sx={{ bgcolor: "#3f51b5" }}>
      <Toolbar>
      <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
			<Typography variant="h6" noWrap component="a" 
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
            color: 'inherit', textDecoration: 'none',}}
			>upGrad E-Shop
			</Typography>

        {/* Updated Search Input */}
       
          
        
        {isLoggedIn ? (
          <>
          <Box sx={{ flexGrow: 1 }} />
          <div className="searchBox">
            <SearchIcon className="searchIcon" />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleSearch}
              className="searchInput"
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
            {isAdmin && (
              <Link to="/add-products" className="navLink">
                <Button color="inherit">Add Products</Button>
              </Link>
            )}
           {/*} <Button className="logoutButton" onClick={onLogout}>Logout</Button>*/}
            <Button className="logoutButton" style={{width:'40px'}} onClick={handleLogout}>Logout</Button>
            <Link to="/" className="navLink"><Button color="inherit">Home</Button></Link>
          </>
        ) : (
          <>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/login" className="navLink">
                <Button sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}>
                  <u>Login</u>
                </Button>
              </Link>
              <Link to="/signup" className="navLink">
                <Button sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}>
                  <u>Sign Up</u>
                </Button>
            </Link>
          </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


