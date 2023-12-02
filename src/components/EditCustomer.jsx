import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    // States
    const [customer, setCustomer] = useState(props.customer); // Temporarily save customer information received with props
    const [showDialog, setShowDialog] = useState(false); // State to show and hide Dialog component


    // Closes edit-form if the click is not a backdrop click i.e. doesn't close when clicking outside of dialog component
    const handleCloseDialog = (_, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    // Shows edit-form with customer information to be edited
    const handleShowDialog = () => {
        setCustomer(props.customer);
        setShowDialog(true);
    }

    // Saves editing a customer
    const handleSave = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        setShowDialog(false);
    }

    // Receives data from input fields and saves each input to correct properties in state
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    // Renders the components to edit customer
    return (
        <>
            <Button 
                sx={{ 
                    margin: "5px", 
                    display: "flex", 
                    justifyContent: 'flex-end' 
                }} 
                onClick={handleShowDialog}
            >   Edit
            </Button>
            
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent
                    sx={{
                        display:'flex',
                        flexWrap:'wrap',
                        flexDirection:'column',
                        gap:'10px',
                        width:'400px',
                        paddingTop:'5px'
                    }}
                >
                    <TextField
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Postcode"
                        name="Postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseDialog}
                    >   Close
                    </Button>
                    
                    <Button 
                    onClick={handleSave}
                    >   Save
                    </Button>
                </DialogActions>


            </Dialog>


        </>
    )

}