import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Add confirm password
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // API call to sign up the user
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        contactNumber
      }),
    });

    if (response.ok) {
      navigate('/login'); // Redirect to login after successful signup
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Signup failed. Please check your input.');
    }
  };

  return (
    <Box sx={{flexGrow: 1}}>
				<Grid container spacing={1}>
					<Grid container item spacing={3}>
						<Grid item xs={4}/>
						<Grid item xs={4}>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "20%"}}>
								<LockOutlinedIcon style={{display: 'inline-block',borderRadius: '60px',padding: '0.6em 0.6em',color: '#ffffff',
                background: "#f50057"}}/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<Typography variant="subtitle1" noWrap sx={{fontSize: "25px",color: 'inherit',}}>Sign up</Typography>
							</div>
              {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}
              <form onSubmit={handleSignup} style={{ marginTop: '10px' }}> {/* Reduced margin */}
                <TextField label="First Name" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                <TextField label="Last Name" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                <TextField label="Email" type="email" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <TextField label="Password" type="password" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <TextField label="Contact Number" type="tel" variant="outlined" fullWidth margin="dense" // Used 'dense' margin to reduce spacing
                  value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>Sign Up</Button>
              </form>
							<div style={{display: 'flex', justifyContent: 'right', marginTop: "30px"}}>
								<Link to="/login">
									<Typography variant="body1">
										Already have an account? Sign in
									</Typography>
								</Link>
							</div>
						</Grid>
						<Grid item xs={4}/>
					</Grid>
				</Grid>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="body2">Copyright © <a href="https://www.upgrad.com/" target="blank">upGrad</a> 2023.</Typography>
        </div>
			</Box>
  );
};

export default Signup;

