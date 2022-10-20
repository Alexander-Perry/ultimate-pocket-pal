import React from 'react';
import Auth from '../utils/auth';
import { Grid, Button, Container } from '@mui/material';


const HomePage = () => {
    // If not logged in, display 'intro' page, with login button.
    // List 7 day Grid (cards), Monday - Sunday
    // Each day show the users entries for that day
    // clicking the day allows adding and removing events
    // 

    const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday']

    return (
        <>
            {!Auth.loggedIn()
                ? (
                    <div>Welcome Page</div>
                )
                : (
                    <Container>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{ p: 2 }}
                        >
                            {dayOfWeek.map((day) => {
                                return (
                                    <Grid item key={day}>{day}</Grid>
                                )
                                
                            })}
                            <Grid item></Grid>
                            <Grid item>Costs</Grid>

                            <Grid item></Grid>


                        </Grid>
                    </Container>
                )}
        </>
    )
};

export default HomePage;