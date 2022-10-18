import React, { useState } from 'react';
import { FormControl as Form, Button, Alert  } from '@mui/material';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        // From React Bootstrap -> Update with new library
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            const response = await createUser(userFormData);
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            email: '',
            password: ''
        });
    };
    return (
        <>
          {/* This is needed for the validation functionality above */}
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your signup!
            </Alert>
    
            <Form.Group>
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
              disabled={!(userFormData.username && userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
          </Form>
        </>
      );
    };
    
    export default SignupForm;