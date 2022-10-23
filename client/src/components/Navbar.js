import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Menu, MenuItem, Box, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../utils/auth';
import { getMe } from '../utils/API';

// NavBar function
const NavBar = () => {
    const [userData, setUserData] = useState({});
    const [anchorElNav, setAnchorElNav] = useState(null);

    // Handler for opening the menu (on smaller screens)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    // Handler for closing the menu (on smaller screens)
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // useEffect function checks Login status, and triggers to changes to userData
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

    // render the NavBar
    // Menu for smaller screens, box and buttons for larger screens
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Ultimate Pocket Pal
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <MenuIcon onClick={handleOpenNavMenu} color='primary' sx={{":hover":{color: '#f50057'}}} />
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key='Home' onClick={handleCloseNavMenu} component={Link} to='/' sx={{'&:hover': { color: '#f50057' }}}>
                                Home
                            </MenuItem>
                            {Auth.loggedIn()
                                ? (
                                    <MenuItem key='Budget' onClick={handleCloseNavMenu} component={Link} to='/budget' sx={{'&:hover': { color: '#f50057' }}}>
                                        Budget
                                    </MenuItem>
                                )
                                : (
                                    <MenuItem key='login' onClick={handleCloseNavMenu} component={Link} to='/login' sx={{'&:hover': { color: '#f50057' }}} >
                                        Login
                                    </MenuItem>
                                )}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Ultimate Pocket Pal
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button  key='Home' component={Link} to='/' onClick={handleCloseNavMenu}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' }
                            }}>
                            Home
                        </Button>
                        {Auth.loggedIn()
                            ? (
                                <Button key='Budget' component={Link} to='/budget' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' } }}>
                                    Budget
                                </Button>
                            )
                            : (
                                <Button key='login' component={Link} to='/login' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' } }}>
                                    Login
                                </Button>
                            )}
                    </Box>
                    {Auth.loggedIn()
                        ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button key='Logout' onClick={Auth.logout} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' } }}>
                                    Sign Out
                                </Button>
                            </Box>
                        )
                        : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button key='Login' component={Link} to='/login' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#f50057' } }}>
                                    Login
                                </Button>
                            </Box>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;