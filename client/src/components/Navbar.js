import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Menu, MenuItem, Box, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../utils/auth';

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <MenuIcon onClick={handleOpenNavMenu} />

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
                            <MenuItem key='Home' onClick={handleCloseNavMenu} >
                                <Link to='/' underline="none">
                                    Home
                                </Link>
                            </MenuItem>

                            <MenuItem key='Budget' onClick={handleCloseNavMenu} >
                                <Link to='/budget' underline="none">
                                    Budget
                                </Link>
                            </MenuItem>
                            {/* Replace the data below with added pages */}
                            {/* <MenuItem key='Budget'onClick={handleCloseNavMenu} >
                                <Link to='/budget'>
                                    Budget
                                </Link>
                            </MenuItem> */}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key='Home' component={Link} to='/' onClick={handleCloseNavMenu}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': { color: 'red' }
                            }}>
                            Home
                        </Button>
                        <Button key='Budget' component={Link} to='/budget' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: 'red' } }}>
                            Budget
                        </Button>
                    </Box>
                    {Auth.loggedIn()
                        ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button key='Logout' onClick={Auth.logout} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: 'red' } }}>
                                    Sign Out
                                </Button>
                            </Box>
                        )
                        : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button key='Login' component={Link} to='/login' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: 'red' } }}>
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