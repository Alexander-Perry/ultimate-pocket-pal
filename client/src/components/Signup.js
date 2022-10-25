import React, { useState } from 'react';
import { FormGroup, FormLabel, TextField, Button, Box, Container, Alert, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

// Sign up form function
const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '', budget: 300 });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // set state of userFormData on text input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // handler function for form submission
    // run createUser function using formd data and assign token on success
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(userFormData);
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const { token } = await response.json();
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setOpen(true);
        }
        setUserFormData({...userFormData,
            name: '',
            email: '',
            password: ''
        });
        navigate('/');
    };

    // Render the signup page
    // open alert on error
    return (
        <>
          <Snackbar  open={open} onClose={() => setOpen(false)} autoHideDuration={5000}>
                <Alert severity='error'>
                    Something went wrong!
                </Alert>
            </Snackbar>
            <Container>
            <Box sx={{ maxWidth: 400, m: 2, }}>
                    <form>
                    <FormGroup sx={{ display: 'grid', gap: 1 }}>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                            <TextField name='name' onChange={handleInputChange} />
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <TextField name='email' onChange={handleInputChange} />
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <TextField name='password' type='password' onChange={handleInputChange} />
                            <Button variant="outlined" onClick={handleFormSubmit} >Sign Up</Button>
                        </FormGroup>
                    </form>
                    <Button variant="outlined" component={Link} to='/login' sx={{ m: 2 }}  >
                        Login Instead
                    </Button>
                </Box>
            </Container>
        </>
    );
    };
    
    export default SignupForm;