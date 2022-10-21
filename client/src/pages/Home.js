import React, {useEffect, useState} from 'react';
import Auth from '../utils/auth';
import { getMe, deleteEvent } from '../utils/API';
import { Button, Container, Tabs, Tab , Box, List, ListItem, IconButton} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
    // If not logged in, display 'intro' page, with login button.
    // List 7 day tabs, Sunday - Sat
    // Each day show the users Events for that day
    // clicking the day allows adding and removing events
    // --> Events themselves provide buttons for this, and additional button added for each day to Add
    // Future-> Date functions to build into proper calendar



const HomePage = () => {
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date().getDay();
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;
    const [tabIndex, setTabIndex] = useState(today);
    const handleTabChange = (event, newTabIndex) => setTabIndex(newTabIndex); 

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

    // const handleAddUserEvent = async 

    const handleDeleteEvent = async (eventID) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const response = await deleteEvent(eventID, token);
            if (!response.ok) {
                throw new Error('An error occurred');
            }
            const updatedUser = await response.json();
            setUserData(updatedUser);
            // removeEventId(eventID)
        } catch (err) {
            console.error(err);
        }
    };

    if (!Auth.loggedIn()) {
        return <h2>Welcome, Please log in</h2>
    }

    if (!userDataLength) {
        return <h2>LOADING...</h2>;
    }
    
    return (
        <Container>
            {!Auth.loggedIn()
                ? (
                    <div>Welcome Page</div>
                )
                : (
                    <Box display={'flex'} sx={{ bgcolor: '#888888' }}>
                        <Box  >
                            <Tabs value={tabIndex} orientation='vertical' onChange={handleTabChange}>
                                {dayOfWeek.map((day, index) => {
                                    return (
                                        <Tab key={day} label={day} />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        <Box sx={{ margin: 2, display: 'flex' }}>
                                <Box>
                                <h2>{dayOfWeek[tabIndex]}</h2>
                                <List>
                                    {userData.events
                                        .filter(event => event.date === tabIndex)
                                        .map((dayEvent) => {
                                            console.log(dayEvent)
                                            return (
                                                <ListItem
                                                    key={dayEvent._id} //need an ID field
                                                    secondaryAction={
                                                        <IconButton edge="end" onClick={()=> handleDeleteEvent(dayEvent._id)} >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                      <Button>{dayEvent.name }</Button>
                                                </ListItem>
                                            )
                                        })
                                    }
                                    <ListItem key={'AddEvent'}><Button >Add a new Event</Button></ListItem>
                                    </List>
                                </Box>
                        </Box>
                    </Box>
                )}
        </Container>
    )
};

export default HomePage;