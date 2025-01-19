

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const Login = ({ setIsLoggedIn, setIsAdmin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
   
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({ username: email, password: password }),
      
    })
   
      
  
    
    if (response.ok) {
    
      //const token=response.body;
      const data = await response.json();
      
     // localStorage.setItem('authToken', token);
      console.log("final"+response.headers.get('authtoken'));

      setIsLoggedIn(true);
     
    setIsAdmin(data.roles[0] === 'ADMIN');
   
      navigate('/Products');
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Login failed. Please check your credentials.');
    }
  }
  

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "30%"}}>
              <LockOutlinedIcon style={{ display: 'inline-block', borderRadius: '60px', 
                padding: '0.6em 0.6em',color: '#ffffff',background: "#f50057"}}/>
						</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
							<Typography variant="subtitle1" noWrap sx={{fontSize: "25px", color: 'inherit',}}>Sign in</Typography>
						</div>
            {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}
            <form onSubmit={handleLogin} style={{ marginTop: '10px' }}> {/* Reduced margin */}
              <TextField label="Email Address" type="email" variant="outlined" fullWidth
              margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}> Sign In</Button>
            </form>
            <Typography variant="body2" sx={{ mt: 1 }}><Link href="/signup" underline="always" style={{ color: 'blue' }}>
              Don't have an account? Sign Up</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Copyright © upGrad 2021.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'center'}}>
			<Typography variant="body2">Copyright © <a href="https://www.upgrad.com/" target="blank">upGrad</a> 2023.</Typography>
		</div>
    </Box>
  );
}
export default Login;




