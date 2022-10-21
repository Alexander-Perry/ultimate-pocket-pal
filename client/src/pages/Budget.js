import React, {useState, useEffect} from 'react';
import { Grid, Button } from '@mui/material';
import { Container } from '@mui/system';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';


const UserBudget = () => {
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;
    let totalCost = 0;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
                if (!token) {
                    return false;
                }

                const response = await getMe(token);
                if (!response.ok) {
                    throw new Error('an error occurred');
                }

                const user = await response.json();
                setUserData(user);
                console.log('user', user)
               
            } catch (err) {
                console.error(err);
            }
        };

        getUserData();
    }, [userDataLength]);
    // Functions here:
    // Get list of user events for the week (title, cost)
    // Display total budget, list of events + cost, then output total funds remaining 
    // Add option to adjust budget
 
    // This is necessary to avoid blank screen
    if (!userDataLength) {
        return <h2>LOADING...</h2>;
    }
    
    return (
        <Container>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{p:2}}
            >
                <Grid item>Budget: ${userData.budget} <Button>Adjust</Button></Grid>
                <Grid item>Costs</Grid>
                {userData.events.map((event) => {
                    totalCost += event.cost;
                    return (
                        <Grid item key={event.title}>{event.title} ${event.cost}</Grid>
                    )
                })}
                <Grid item>Remaining  ${userData.budget - totalCost}</Grid>
               

            </Grid>
        </Container>

    )
}

export default UserBudget;