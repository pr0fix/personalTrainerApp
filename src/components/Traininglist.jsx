import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import AddTraining from "./AddTraining";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'

export default function Trainingpage() {

	// URL for API calls
	const REST_URL = 'https://traineeapp.azurewebsites.net'

	// States
	const [trainings, setTrainings] = useState([]); // State to save training data
	const [open, setOpen] = useState(false);	// State to show and hide snackbar component
	const [msg, setMsg] = useState(""); // State to set message shown in snackbar component

	// GET-request to receive all trainings
	const getTrainings = async () => {
		try {
			const res = await axios.get(`${REST_URL}/gettrainings`);
			const resData = res.data;
			setTrainings(resData);
		}
		catch (err) {
			console.error(err);
		}

	};

	// POST-request to add a new training
	const addTraining = async (training, customerId) => {
		try {

			// Link to customer with customer ID defined in input field in AddTraining -component
			const customerRefLink = `${REST_URL}/api/customers/${customerId}`;

			// Making a new training object to be added to trainings
			const newTraining = {
				date: training.date,
				duration: training.duration,
				activity: training.activity,
				customer: customerRefLink
			};

			// POST-request to add the new training object to trainings API
			const res = await axios.post(`${REST_URL}/api/trainings/`, newTraining, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setTrainings([...trainings, res.data]);
			setOpen(true);
			setMsg("Training added successfully!")
			getTrainings();
		}
		catch (err) {
			console.error(err);
		}
	}

	// DELETE-request to delete a training
	const deleteTraining = async (params) => {
		try {
			if (window.confirm("Are you sure?")) {
				const res = await axios.delete(`${REST_URL}/api/trainings/${params.data.id}`);
				// console.log(params.data.id)
				console.log("Training deleted successfully!", res.data);
				setOpen(true);
				setMsg("Training deleted successfully!");
				getTrainings();
			}
		}
		catch (err) {
			console.error(err);
		}
	}


	// useEffect hook to fetch training data when the component mounts
	useEffect(() => {
		getTrainings();
	}, []);


	// Properties for ag-grid columns
	const columnProperties = {
		sortable: true,
		filter: true,
		floatingFilter: true

	}

	// Ag grid columns
	const columns = [
		{
			headerName: 'Date', field: 'date', ...columnProperties,
			cellRenderer: (data) => {
				return data.value ? moment(data.value).format('DD.MM.YYYY HH:mm') : '';
			}
		},
		{ headerName: 'Duration', field: 'duration', ...columnProperties },
		{ headerName: 'Activity', field: 'activity', ...columnProperties },
		{ headerName: 'Customer', field: 'customer',
			valueGetter: (params) => {
				const customer = params.data.customer;
				if(customer && customer.firstname && customer.lastname) {
					return `${customer.firstname} ${customer.lastname}`;	
				} else {
					return '';
				}
			}
		},
		{
			cellRenderer: params =>
				<Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>
		}

	];

	// Renders the Ag-grid component with training data
	return (
		<>
			<div className="ag-theme-material" style={{ height: '70vh', maxWidth: 1000, margin: "auto" }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={columns}
					pagination={true}
					paginationPageSize={8}

				/>
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={() => setOpen(false)}
					message={msg}
				>


				</Snackbar>
			</div>
			<AddTraining
				addTraining={addTraining}
			/>
		</>
	);
}