import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    // States
    const [customer, setCustomer] = useState(props.customer);
    const [showDialog, setShowDialog] = useState(false);


    // Closes edit-form
    const handleCloseDialog = (_, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    // Shows edit-form
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
            <Button style={{ margin: "5px", display: "flex", justifyContent: 'flex-end' }} variant="outlined" onClick={handleShowDialog}>Edit</Button>
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
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
                        label="postcode"
                        name="postcode"
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
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>


            </Dialog>


        </>
    )

}