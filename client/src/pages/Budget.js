import React, {useState, useEffect} from 'react';
import { Grid, Button, Modal, Box, Typography, FormGroup, FormLabel, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { getMe, editBudget } from '../utils/API';
import Auth from '../utils/auth';

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

const UserBudget = () => {
    const [userData, setUserData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const [budgetFormData, setBudgetFormData] = useState({budget: ''});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBudgetFormData({ ...budgetFormData, [name]: value });
    };
    let totalCost = 0;

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
    // Functions here:
    // Get list of user events for the week (title, cost)
    // Display total budget, list of events + cost, then output total funds remaining
    // Add option to adjust budget
 
    const handleEditBudget = async (e) => {
        e.preventDefault();
      console.log(budgetFormData)
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const response = await editBudget(budgetFormData, token);
            if (!response.ok) {
                throw new Error('An error occurred');
            }
            const updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err);
        }
        handleModalClose();
    };



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
                <Grid item>Budget: ${userData.budget}
                    <Button onClick={() => setModalOpen(true)}>Adjust</Button>
            </Grid>
                <Grid item>Costs</Grid>
                {userData.events.map((event) => {
                    totalCost += event.cost;
                    return (
                        <Grid item key={event.title}>{event.title} ${event.cost}</Grid>
                    )
                })}
                <Grid item>Remaining  ${userData.budget - totalCost}</Grid>
               

            </Grid>
            {budgetFormData &&
            <Modal name="addModal" open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adjust Budget
                    </Typography>
                    <Typography id="add-modal-description" component="div" sx={{ mt: 2 }}>
                        <form>
                            <FormGroup sx={{ display: 'grid', gap: 1 }}>
                                <FormLabel htmlFor='budget'>New Budget:</FormLabel>
                                <TextField name='budget' onChange={handleInputChange} />
                                <Button variant="outlined" name='submit' onClick={handleEditBudget} >Edit Budget</Button>
                            </FormGroup>
                        </form>
                    </Typography>
                </Box>
                </Modal>
            }

        </Container>

    )
}

export default UserBudget;