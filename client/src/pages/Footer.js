import { AppBar, Container, Toolbar, Box, Button } from '@mui/material';
import React from 'react';

// render the footer
const FooterPage = () => {

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <Box>
                            <Button key='github link' component={'a'} href='https://github.com/Alexander-Perry'
                                sx={{
                                    my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' }
                                }}>
                                Alexander Perry- 2022
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
};

export default FooterPage;