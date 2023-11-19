import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

export default function AddTraining(props) {

    // States
    const [validationError, setValidationError] = useState(false);
    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customerId: '' });
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

    // Saves adding a new training
    const handleSave = () => {
        if (
            // training.date && 
            training.duration && training.activity && training.customerId) {
            props.addTraining(training, training.customerId);
            setShowDialog(false);
        } else {
            setValidationError(true);
        }
    }

    // Receives data from input fields and saves each input to correct properties in state
    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
        setValidationError(false);
    }


    // Renders the components to add a new training
    return (
        <>
            <Button style={{ margin: "5px", display: "flex", justifyContent: 'flex-end' }} variant="contained" onClick={handleShowDialog}>Add training</Button>
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    {/* <TextField
                        required
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={handleInputChange}
                        error={validationError && !training.date}
                    /> */}
                    
                    <TextField
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        error={validationError && !training.duration}
                        required
                    />
                    <TextField
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        error={validationError && !training.activity}
						required
                    />
                    <TextField
                        label="Customer ID"
                        name="customerId"
                        value={training.customerId}
                        onChange={handleInputChange}
                        error={validationError && !training.customerId}
						required
                    ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>


            </Dialog>


        </>
    )

}