import {useEffect, useState} from 'react';
import { AgGridReact } from "ag-grid-react";
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
export default function Customerpage() {
    const REST_URL = 'https://traineeapp.azurewebsites.net/api';

    const [customers, setCustomers] = useState([]);

    useEffect(() => listCustomers(), []);

    const listCustomers = () => {
        axios.get(`${REST_URL}/customers`)
        .then((res) => {
            console.log(res.data.content)
            setCustomers(res.data.content)
        })
    }

    const columnProperties = {
        sortable: true,
        filter: true,
        floatingFilter: true
    }

    const columns = [
        {headerName: 'Firstname', field: 'firstname', ...columnProperties },
        {headerName: 'Lastname', field: 'lastname', ...columnProperties },
        {headerName: 'Street address', field: 'streetaddress', ...columnProperties },
        {headerName: 'Postcode', field: 'postcode', ...columnProperties },
        {headerName: 'City', field: 'city' , ...columnProperties},
        {headerName: 'Email', field: 'email', ...columnProperties },
        {headerName: 'Phone', field: 'phone', ...columnProperties }
    ]
    return (
    <>
    <div className="ag-theme-material" style={{ height: 650, width: 1500, margin: "auto" }}>
    <AgGridReact
    rowData={customers}
    columnDefs={columns}
    pagination={true}
    paginationPageSize={10}
    />
    </div>
    </>
)
    }