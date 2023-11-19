import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    // States
    const [validationError, setValidationError] = useState(false);
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [showDialog, setShowDialog] = useState(false);

    // Closes add-form
    const handleCloseDialog = (_, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    // Shows add-form
    const handleShowDialog = () => {
        setShowDialog(true);
    }

    // Saves adding a new customer
    const handleSave = () => {
        // Define every field to be required before customer can be added
        const requiredFields = ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'];

        // Check if every field is valid in new customer
        const isValid = requiredFields.every(field => customer[field]);

        // If new customer has all the required fields add a new customer
        if (isValid) {
            props.addCustomer(customer);
            setShowDialog(false);

            // Else set validationError to true
        } else {
            setValidationError(true);
        }
    }

    // Receives data from input fields and saves each input to correct properties in state
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
        setValidationError(false);
    }


    // Renders the components to add a new customer
    return (
        <>
            <Button style={{ margin: "5px" }} variant="contained" onClick={handleShowDialog}>Add customer</Button>
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                        error={validationError && !customer.firstname}
                        required
                    />
                    <TextField
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                        error={validationError && !customer.lastname}
                        required
                    />
                    <TextField
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        error={validationError && !customer.streetaddress}
                        required
                    />
                    <TextField
                        label="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        error={validationError && !customer.postcode}
                        required
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                        error={validationError && !customer.city}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        error={validationError && !customer.email}
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        error={validationError && !customer.phone}
                        required
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