import React, { useState } from 'react';
import { FormGroup, FormLabel, TextField, Button, Box, Container, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

// Login Form Function 
const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // handleInput Change
    // Update the state for userFormData on text input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Login Form Submission handler function
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Try the Login function with the form data, pass the token to Auth
        try {
            const response = await loginUser(userFormData);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const { token } = await response.json();
            Auth.login(token);
        } catch (err) {
            // Open the Alert (Snackbar)
            setOpen(true);
        }

        // Clear the state data for userFormData
        setUserFormData({ email: '', password: '' });
        navigate('/');
        
    };
    // Return the data for render
    return (
        <>
            <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={5000}>
                <Alert severity='error'>
                    Invalid email or password
                </Alert>
            </Snackbar>
            <Container>
                <Box sx={{ width: 400, m: 2, }}>
                    <form>
                        <FormGroup sx={{ display: 'grid', gap: 1 }}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField name='email' onChange={handleInputChange} />
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField name='password' type='password' onChange={handleInputChange} />
                            <Button variant="outlined" name='submit' onClick={handleFormSubmit} >Login</Button>
                        </FormGroup>
                    </form>
                    <Button variant="outlined" component={Link} to='/signup' sx={{ m: 2 }}  >
                        Sign Up Instead
                    </Button>
                </Box>
            </Container>
        </>
    )
};
export default LoginForm;