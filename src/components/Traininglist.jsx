import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import axios from "axios";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import AddTraining from "./AddTraining";
import moment from "moment/moment";

export default function Trainingpage() {

	// URL for API calls
	const REST_URL = 'https://traineeapp.azurewebsites.net'

	// States
	const [trainings, setTrainings] = useState([]);

	// GET-request to receive all trainings
	const getTrainings = async () => {
		try {
			const res = await axios.get(`${REST_URL}/gettrainings`)
			const resData = res.data;
			setTrainings(resData)
		}
		catch (err) {
			console.error(err);
		}

	};

	// POST-request to add a new training
	const addTraining = async (training, customerId) => {
		try {
			const ISODate = moment(training.date, "DD.MM.YYYY HH.mm.ss").toISOString();

			const customerRefLink = `${REST_URL}/api/customers/${customerId}`;

			const newTraining = {
				date: ISODate,
				duration: training.duration,
				activity: training.activity,
				customer: customerRefLink
			};
			console.log(newTraining)

			const res = await axios.post(`${REST_URL}/api/trainings/`, newTraining, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setTrainings([...trainings, res.data]);
			getTrainings()

		}
		catch (err) {
			console.error(err);
		}
	}

	// DELETE-request to delete a training

	// useEffect
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
				return data.value ? (new Date(data.value)).toLocaleString() : '';
			}
		},
		{ headerName: 'Duration', field: 'duration', ...columnProperties },
		{ headerName: 'Activity', field: 'activity', ...columnProperties },
		{ headerName: 'Customer first name', field: 'customer.firstname', ...columnProperties },
		{ headerName: 'Customer last name', field: 'customer.lastname', ...columnProperties }

	];

	// Return
	return (
		<>
			<div className="ag-theme-material" style={{ height: 700, width: 1000, margin: "auto" }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={columns}
					pagination={true}
					paginationPageSize={10}

				/>
			</div>
			<AddTraining
				addTraining={addTraining}
			/>
		</>
	);
}