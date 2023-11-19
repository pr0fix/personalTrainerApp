import { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from '@mui/material';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'


export default function Customerpage() {
    //URL for API calls
    const REST_URL = 'https://traineeapp.azurewebsites.net/api';

    // States
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [gridApi, setGridApi] = useState(null);


    // GET-request to receive all customers
    const getCustomers = async () => {
        try {
            const response = await axios.get(`${REST_URL}/customers`);
            const resData = response.data.content;
            setCustomers(resData);
        }
        catch (err) {
            console.error('Error fetching customers:', err);
        }
    }


    // POST-request to add a new customer
    const addCustomer = async (customer) => {
        try {
            const res = await axios.post(`${REST_URL}/customers`, customer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Post request successful!', res.data);
            setMsg("Customer added successfully!");
            setOpen(true);
            getCustomers();
        } catch (err) {
            console.error('Error in POST request', err)
        }


    }

    // DELETE-request to delete a customer 
    const deleteCustomer = async (params) => {
        try {
            if (window.confirm("Are you sure?")) {
                const res = await axios.delete(params.data.links[1].href);
                console.log("Customer deleted successfully!", res.data)
                setMsg("Customer deleted successfully!")
                setOpen(true);
                getCustomers();
            }
        }
        catch (err) {
            console.error('Error deleting customer!', err)
        }

    }

    // PUT-request to edit an existing customer
    const updateCustomer = async (customer, link) => {
        try {
            if (window.confirm("Are you sure?")) {
                const res = await axios.put(link, customer, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setOpen(true);
                setMsg("Customer edited successfully!");
                getCustomers();
            }
        } catch (err) {
            console.error(err);
        }
    }

    //useEffect hook to fetch customer data when the component mounts
    useEffect(() => {
        getCustomers();
    }, [])


    // Ag-grid column properties 
    const columnProperties = {
        sortable: true,
        filter: true,
        floatingFilter: true
    }

    // Ag grid columns
    const columns = [
        { headerName: 'Firstname', field: 'firstname', ...columnProperties },
        { headerName: 'Lastname', field: 'lastname', ...columnProperties },
        { headerName: 'Street address', field: 'streetaddress', ...columnProperties },
        { headerName: 'Postcode', field: 'postcode', ...columnProperties },
        { headerName: 'City', field: 'city', ...columnProperties },
        { headerName: 'Email', field: 'email', ...columnProperties },
        { headerName: 'Phone', field: 'phone', ...columnProperties },
        {
            cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>
        }
    ]

    // onGridReady triggered when grid is ready to be interacted with
    const onGridReady = params => {
        // Set Grid API reference obtained from params object
        setGridApi(params.api);
    };

    // Function triggered when export button is clicked on page
    const onExportClick = () => {
        // Check if gridApi is ready to be interacted with
        if (gridApi) {

            // Define which columns to export to CSV file (excluding headers and edit&delete buttons)
            const columnsToExport = {
                columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"],
                skipColumnHeaders: true
            };

            // Export grid data as CSV with columns defined
            gridApi.exportDataAsCsv(columnsToExport);

            // If gridApi is not ready to be interacted with, shows an error message in console
        } else {
            console.error('Grid API not available');
        }
    }

    // Renders Ag-grid component for customerlist
    return (
        <>
            <div>

                <div className="ag-theme-material" style={{ height: 650, width: 1800, margin: "auto" }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        onGridReady={onGridReady}
                    />

                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                        message={msg}
                    ></Snackbar>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <AddCustomer
                    addCustomer={addCustomer}
                />
                <Button style={{ margin: "5px" }} variant="contained" onClick={onExportClick}>export</Button>
            </div>
        </>

    )
}