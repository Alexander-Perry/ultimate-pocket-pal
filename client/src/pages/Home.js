import React, {useState} from 'react';
import Auth from '../utils/auth';
import { Button, Container, Tabs, Tab , Box} from '@mui/material';

// let today = new Date();
// console.log(today.getDay());


const HomePage = () => {
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date().getDay();
    const [tabIndex, setTabIndex] = useState(today);
    const handleTabChange = (event, newTabIndex) => setTabIndex(newTabIndex); 

    // If not logged in, display 'intro' page, with login button.
    // List 7 day tabs, Sunday - Sat
    // Each day show the users entries for that day
    // clicking the day allows adding and removing events
    //
    // Future-> Date functions to build into proper calendar


   

    
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
                                        <Tab label={day} />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        <Box sx={{ margin: 2, display: 'flex' }}>
                            {tabIndex === 0 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 1 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 2 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 3 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 4 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 5 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}
                            {tabIndex === 6 && (
                                <Box>
                                    {tabIndex}
                                </Box>
                            )}

                        </Box>
                    </Box>
                )}
        </Container>
    )
};

export default HomePage;