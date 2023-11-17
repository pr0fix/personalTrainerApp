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
	const [customer, setCustomer] = useState([]);

	useEffect(() => listTrainings(), []);

	const listTrainings = () => {
		axios.get(`${REST_URL}/trainings`)
		.then((res) => {
			console.log(res.data.content)
			setTrainings(res.data.content)
			setCustomer(res.data.content.links.href)
			console.log(res.data.content.links.href)
		})
		.catch(err => console.error(err))
	}

	const addCustomerToTraining = () => {
		axios.get(`${REST_URL}/trainings/`)
	}
	
	const columnProperties = {
		sortable: true,
		filter: true,
		floatingFilter: true

	}

	// Ag grid columns
	const columns = [
		{headerName:'Date', field: 'date', ...columnProperties,
		cellRenderer: (data) => {
			return data.value ? (new Date(data.value)).toLocaleString() : '';
		}
	},
		{headerName:'Duration', field: 'duration', ...columnProperties},
		{headerName:'Activity', field: 'activity', ...columnProperties},
		{headerName:'Customer', field: 'customer', ...columnProperties}
	
	];

    return (
    <>
    <div className="ag-theme-material" style={{ height: 650, width: 630, margin: "auto" }}>
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