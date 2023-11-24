import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddTraining(props) {
	const REST_URL = 'https://traineeapp.azurewebsites.net/api'; //URL for API calls

	// States
	const [validationError, setValidationError] = useState(false);
	const [training, setTraining] = useState({ date: '', duration: '', activity: '', customerId: '' });
	const [showDialog, setShowDialog] = useState(false);
	const [customers, setCustomers] = useState([]); // State to store customers

	// GET-request to receive all customers
	const fetchCustomers = async () => {
		try {
			const customerRes = await axios.get(`${REST_URL}/customers`);
			const customerResData = customerRes.data.content;
			setCustomers(customerResData);
		}
		catch (err) {
			console.error('Error fetching customers:', err);
		}
	}

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

	const handleInputDate = (date) => {
		setTraining({...training, date});
		setValidationError(false);
	}

	// Receives data from input fields and saves each input to correct properties in state
	const handleInputChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
		setValidationError(false);
	}

	useEffect(() => {
		fetchCustomers();
	}, [])

	// Renders the components to add a new training
	return (
		<>
			<Button style={{ margin: "5px", display: "flex", justifyContent: 'flex-end' }} variant="contained" onClick={handleShowDialog}>Add training</Button>
			<Dialog
				open={showDialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle style={{ textAlign: "center" }}>New Training</DialogTitle>
				<DialogContent style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", paddingTop: "5px" }}>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker 
						label="Date *"
						name="date"
						value={training.date}
						onChange={handleInputDate}
						error={validationError && !training.date}
						ampm={false}
						>
						</DateTimePicker>
					</LocalizationProvider>

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

					<FormControl
						fullWidth
						error={validationError && !training.customerId}
					>
						<InputLabel>Customer *</InputLabel>

						<Select
							value={training.customerId || ''}
							onChange={(event) => setTraining({ ...training, customerId: event.target.value })}
						
						>
							<MenuItem
								disabled
								value=""
							>Select a customer
							</MenuItem>
							{customers.map((customer) => {
								return <MenuItem key={customer.links[0].href} value={customer.links[0].href}
								> {customer.firstname} {customer.lastname}
								</MenuItem>
							})}
						</Select>
					</FormControl>

				</DialogContent>

				<DialogActions>
					<Button onClick={handleCloseDialog}>Close</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>

			</Dialog>


		</>
	)

}