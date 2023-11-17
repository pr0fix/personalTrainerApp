import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import axios from "axios";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'

export default function Trainingpage() {

	// REST Service API call url
	const REST_URL = 'https://traineeapp.azurewebsites.net/api'

	// States
	const [trainings, setTrainings] = useState([]);

	useEffect(() => {
		const listTrainings = async () => {
		  try {
			const response = await axios.get(`${REST_URL}/trainings`);
			const trainingData = response.data.content;
	
			const promises = trainingData.map(async (training) => {
			  try {
				const customerRes = await axios.get(training.links.find(link => link.rel === 'customer').href);
				const customer = customerRes.data;
				return { ...training, customer };
			  } catch (err) {
				console.error('Error fetching customer data:', err);
				return training;
			  }
			});
	
			const trainingsWithCustomers = await Promise.all(promises);
			setTrainings(trainingsWithCustomers);
		  } catch (error) {
			console.error('Error fetching training data:', error);
		  }
		};
	
		listTrainings();
	  }, []);

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
		</>
	);
}