import React, { useState } from 'react';
import { FormGroup, FormLabel, TextField, Button, Box, Container, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        
        e.preventDefault();
        console.log(userFormData)

        try {
            const response = await loginUser(userFormData);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);

        } catch (err) {
            setOpen(true);
        }

        setUserFormData({
            email: '',
            password: ''
        });
        navigate('/');
        
    }
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