import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [showDialog, setShowDialog] = useState(false);

    const handleCloseDialog = (_, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    const handleShowDialog = () => {
        setShowDialog(true);
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setShowDialog(false);
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }


    return (
        <>
            <Button style={{ margin: "5px", display: "flex", justifyContent: 'flex-end' }} variant="outlined" onClick={handleShowDialog}>Add customer</Button>
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