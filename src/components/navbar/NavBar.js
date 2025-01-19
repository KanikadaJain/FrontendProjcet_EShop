

import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { Link,useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import {ShoppingCart} from "@mui/icons-material";
import Box from "@mui/material/Box";
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
    <AppBar sx={{ bgcolor: "#3f51b5", position: 'fixed' }}>
      <Container maxWidth={false}>
      <Toolbar disableGutters>
        <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" noWrap component="a" href="/home"
						sx={{mr: 2, display: { xs: 'none', md: 'flex' },fontFamily: 'monospace',
						color: 'inherit', textDecoration: 'none',}}>upGrad E-Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>



          </Box>
					<ShoppingCart sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography variant="h6" noWrap component="a" href=""
						sx={{ mr: 2, display: { xs: 'flex', md: 'none' },flexGrow: 1,
            fontFamily: 'monospace', color: 'inherit', textDecoration: 'none',}}
					>upGrad E-Shop</Typography>
          <Box sx={{ flexGrow: 1 }} />          
          
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/add-products" className="navLink">
                  <Button color="inherit">Add Products</Button>
                </Link>
              )}
            {/*} <Button className="logoutButton" onClick={onLogout}>Logout</Button>*/}
              <Button className="logoutButton" style={{width:'40px'}} onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="navLink">
                <Button sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}
								>Login</Button>
              </Link>
              <Link to="/signup" className="navLink">
              <Button sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}
								>Sign Up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;


