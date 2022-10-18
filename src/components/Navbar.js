import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Menu, MenuItem, Box, Typography, Button} from '@mui/material';
import  MenuIcon  from '@mui/icons-material/Menu';

// import { FormControl, FormGroup, Button, Alert, FormLabel  } from '@mui/material';
// import Signup from './Signup';
// import Login from './Login';
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
                      
                            <MenuIcon  onClick={handleOpenNavMenu}/>
       
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

                            <MenuItem key='Budget'onClick={handleCloseNavMenu} >
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

                    <Button key='Home'  onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Link to='/' >
                                Home
                                </Link>
                            </Button>
                        {/* {Auth.loggedIn() ? ( */}
                            <>
                            <Button key='Budget' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to='/budget' >
                                    Budget
                                </Link>
                            </Button>
                        </>
                        {/* ): <></>} */}

                       
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        Login/Signing buttons here

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;


// //     // return (
// //     //     <>
// //     //       <Navbar bg='dark' variant='dark' expand='lg'>
// //     //         <Container fluid>
// //     //           <Navbar.Brand as={Link} to='/'>
// //     //             Home
// //     //           </Navbar.Brand>
// //     //           <Navbar.Toggle aria-controls='navbar' />
// //     //           <Navbar.Collapse id='navbar'>
// //     //             <Nav className='ml-auto'>
// //     //               <Nav.Link as={Link} to='/'>
// //     //                 Home
// //     //               </Nav.Link>
// //     //               {/* if user is logged in show saved books and logout */}
// //     //               {Auth.loggedIn() ? (
// //     //                 <>
// //     //                   <Nav.Link as={Link} to='/budget'>
// //     //                     Budget
// //     //                   </Nav.Link>
// //     //                   <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
//     //                 </>
//     //               ) : (
//     //                 <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
//     //               )}
//     //             </Nav>
//     //           </Navbar.Collapse>
//     //         </Container>
//     //         </Navbar>
            
//     //       {/* set modal data up */}
//     //       <Modal
//     //         size='lg'
//     //         show={showModal}
//     //         onHide={() => setShowModal(false)}
//     //         aria-labelledby='signup-modal'>
//     //         {/* tab container to do either signup or login component */}
//     //         <Tab.Container defaultActiveKey='login'>
//     //           <Modal.Header closeButton>
//     //             <Modal.Title id='signup-modal'>
//     //               <Nav variant='pills'>
//     //                 <Nav.Item>
//     //                   <Nav.Link eventKey='login'>Login</Nav.Link>
//     //                 </Nav.Item>
//     //                 <Nav.Item>
//     //                   <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
//     //                 </Nav.Item>
//     //               </Nav>
//     //             </Modal.Title>
//     //           </Modal.Header>
//     //           <Modal.Body>
//     //             <Tab.Content>
//     //               <Tab.Pane eventKey='login'>
//     //                 <Login handleModalClose={() => setShowModal(false)} />
//     //               </Tab.Pane>
//     //               <Tab.Pane eventKey='signup'>
//     //                 <Signup handleModalClose={() => setShowModal(false)} />
//     //               </Tab.Pane>
//     //             </Tab.Content>
//     //           </Modal.Body>
//     //         </Tab.Container>
//     //       </Modal>
//     //     </>
//     //   );
  