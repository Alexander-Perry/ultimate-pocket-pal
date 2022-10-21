import React, {useEffect, useState} from 'react';
import Auth from '../utils/auth';
import { getMe, deleteEvent, createEvent } from '../utils/API';
import { Button, Container, Tabs, Tab , Box, List, ListItem, IconButton, FormGroup, FormLabel, TextField, Modal, Typography} from '@mui/material';
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
    
    const [tabIndex, setTabIndex] = useState(today);
    const handleTabChange = (event, newTabIndex) => setTabIndex(newTabIndex);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventFormData, setEventFormData] = useState({ title: '', cost: 0, date: tabIndex});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventFormData({ ...eventFormData, [name]: value, date: tabIndex });
    };

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const userDataLength = Object.keys(userData).length;
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
               
            } catch (err) {
                console.error(err);
            }
        };

        getUserData();
    }, [userDataLength]);


    const handleDeleteEvent = async (eventID) => {
        console.log(userDataLength)
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

    

    // const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false);
    // const handleEditEvent = async () =>{}
    const handleAddEvent = async (e) => {
        e.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const response = await createEvent(eventFormData, token)
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const  updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err)
        }
        setEventFormData({ title: '', cost: 0, date: tabIndex })
        handleModalClose();
        console.log(userDataLength)
    }

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
                                                    key={dayEvent._id} 
                                                    secondaryAction={
                                                        <IconButton edge="end" onClick={()=> handleDeleteEvent(dayEvent._id)} >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                      <Button>{dayEvent.title }</Button>
                                                </ListItem>
                                            )
                                        })
                                    }
                                    <ListItem key={'AddEvent'}><Button onClick={() => setModalOpen(true)} >Add a new Event</Button></ListItem>
                  
                                </List>
                            </Box>
                        </Box>
                    </Box>
                )}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add an Event for {dayOfWeek[tabIndex]}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form>
                        <FormGroup sx={{ display: 'grid', gap: 1 }}>
                            <FormLabel htmlFor='title'>Event Title:</FormLabel>
                            <TextField name='title' onChange={handleInputChange} />
                            <FormLabel htmlFor='cost'>Cost</FormLabel>
                            <TextField name='cost' onChange={handleInputChange} />
                            <Button variant="outlined" name='submit' onClick={handleAddEvent} >Create Event</Button>
                        </FormGroup>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </Container>

    )
};

export default HomePage;