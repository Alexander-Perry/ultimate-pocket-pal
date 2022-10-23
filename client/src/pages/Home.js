import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { getMe, deleteEvent, createEvent, editEvent } from '../utils/API';
import { Button, Container, Tabs, Tab, Box, List, ListItem, IconButton, FormGroup, FormLabel, TextField, Modal, Typography, Select, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Login from '../components/Login'

// If not logged in, display the Login page
// Vertical tab list of Days of the week
// Each day displays the User's events for that day, and an add event button
// Clicking the event itself brings up a Modal window to edit the event data
// Future: More detail for events and added Time blocks for each day. 


// Home Function
// Manages the User Events
const HomePage = () => {
    // Array of weekdays
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // Get Today's date - for navigating to today's date on login
    const today = new Date().getDay();

    const [userData, setUserData] = useState({});

    // state for selected Tab
    const [tabIndex, setTabIndex] = useState(today);
    const handleTabChange = (event, newTabIndex) => setTabIndex(newTabIndex);

    // Modal control for Add Event
    const [addModalOpen, setAddModalOpen] = useState(false);
    // Modal Control for Edit event
    const [eventModalOpen, setEventModalOpen] = useState(false);

    // state for eventForm data
    const [eventFormData, setEventFormData] = useState({ title: '', cost: 0, date: tabIndex });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventFormData({ ...eventFormData, [name]: value, date: tabIndex });
    };
    // state for Selected Event
    const [selectedEventData, setSelectedEventData] = useState();
    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedEventData({ ...selectedEventData, [name]: value })
    };

    // Style for the Modal windows
    const ModalStyle = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Hook for UserData, chcek for login status
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

    // Handler for closing the Modal windows
    const handleModalClose = () => {
        setAddModalOpen(false);
        setEventModalOpen(false);
    };

    // Add event handler function,
    //  Checks login status, if logged in call createEvent function with eventformdata and the user token
    // On success, clear the form data and close the modal. 
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
            const updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err)
        }
        setEventFormData({ title: '', cost: 0, date: tabIndex })
        handleModalClose();
    };

    // Event to handle Deleting event 
    // Check for login status
    // Call the deleteEvent function with the eventID and user token
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
        } catch (err) {
            console.error(err);
        }
    };

    // Function to handle Editing Events
    // Checks for login status
    // calls editEvent function with selectedEventData from the Modal and the user token
    // On Success, clears the selectedEventData state and closes the modal 
    const handleEditEvent = async (e) => {
        e.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const response = await editEvent(selectedEventData, token);
            if (!response.ok) {
                throw new Error('An error occurred');
            }
            const updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err);
        }
        setSelectedEventData(0)
        handleModalClose();
    };

    // Checks if user is logged in, if not, display the login screen
    if (!Auth.loggedIn()) {
        return <Login/>
    }

    // display loading while waiting for userdata to load
    if (!userDataLength) {
        return <h2>LOADING...</h2>;
    }

    // Render the page
    return (
        <Container>
            {!Auth.loggedIn()
                ? (
                    <div>Welcome Page</div>
                )
                : (
                    <Box display={'flex'} >
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
                                            return (
                                                <ListItem
                                                    key={dayEvent._id}
                                                    secondaryAction={
                                                        <IconButton edge="end" onClick={() => handleDeleteEvent(dayEvent._id)} >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    }>
                                                    <Button onClick={() => {
                                                        setSelectedEventData(dayEvent)
                                                        setEventModalOpen(true)
                                                    }}>
                                                        {dayEvent.title}
                                                    </Button>
                                                </ListItem>
                                            )
                                        })
                                    }
                                    <ListItem key={'AddEvent'}><Button onClick={() => setAddModalOpen(true)} >Add a new Event</Button></ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Box>
                )}
            <Modal name="addModal" open={addModalOpen} onClose={handleModalClose}>
                <Box sx={ModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add an Event for {dayOfWeek[tabIndex]}
                    </Typography>
                    <Typography id="add-modal-description" component="div" sx={{ mt: 2 }}>
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

            {selectedEventData &&
                <Modal name="editModal" open={eventModalOpen} onClose={handleModalClose}>
                    <Box sx={ModalStyle}>
                        <Typography id="edit-modal-title" variant="h6" component="h2">
                            Edit Event: {selectedEventData.title}
                        </Typography>
                        <Typography id="modal-modal-description" component="div" sx={{ mt: 2 }}>
                            <form>
                                <FormGroup sx={{ display: 'grid', gap: 1 }}>
                                    <FormLabel htmlFor='title'>Event Title:</FormLabel>
                                    <TextField name='title' onChange={handleEditInputChange} value={selectedEventData.title} />
                                    <FormLabel htmlFor='cost'>Cost</FormLabel>
                                    <TextField name='cost' onChange={handleEditInputChange} value={selectedEventData.cost} />
                                    <FormLabel htmlFor='date'>Day of week</FormLabel>
                                    <Select labelId='event-select-label' id='event-select' label='Date' name='date' value={selectedEventData.date} onChange={handleEditInputChange} >
                                        {dayOfWeek.map((day, index) => {
                                            return (
                                                <MenuItem key={index} value={index}>{day}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <Button variant="outlined" name='submit' onClick={handleEditEvent} >Edit Event</Button>
                                </FormGroup>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            }

        </Container>

    )
};

export default HomePage;