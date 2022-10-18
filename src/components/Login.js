import React, { useState } from 'react';

//  Replace these with new component library
import { FormControl, FormGroup, Button, Alert, FormLabel  } from '@mui/material';

import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        try {
            const response = await loginUser(userFormData);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);

        } catch (err) {
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        });
    }
    return (
        <>
            <FormControl noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                </Alert>
                <FormControl.Group>
                    <FormLabel  htmlFor='email'>Email</FormLabel >
                    <FormControl
                        type='text'
                        placeholder='Your email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <FormControl.Feedback type='invalid'>Email is required!</FormControl.Feedback>
                </FormControl.Group>

                <FormGroup>
                    <FormLabel  htmlFor='password'>Password</FormLabel >
                    <FormControl
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <FormControl.Feedback type='invalid'>Password is required!</FormControl.Feedback>
                </FormGroup>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </FormControl>

        </>
    )

}
export default LoginForm;