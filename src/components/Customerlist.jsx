import { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from '@mui/material';
import axios from 'axios';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'


export default function Customerpage() {

    const REST_URL = 'https://traineeapp.azurewebsites.net/api'; //URL for API calls

    // States
    const [customers, setCustomers] = useState([]); // State to store customers
    const [open, setOpen] = useState(false); // State to show/hide Snackbar-component
    const [msg, setMsg] = useState(""); // State to set message to be showed in Snackbar-component
    const [gridApi, setGridApi] = useState(null); // State to set params.api to when grid is ready


    // GET-request to receive all customers
    const getCustomers = async () => {
        try {
            const customerRes = await axios.get(`${REST_URL}/customers`);
            const customerResData = customerRes.data.content;
            setCustomers(customerResData);
        }
        catch (err) {
            console.error('Error fetching customers:', err);
        }
    }


    // POST-request to add a new customer
    const addCustomer = async (customer) => {
        try {
            const addCustomerRes = await axios.post(`${REST_URL}/customers`, customer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Post request successful!', addCustomerRes.data);
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
                const deleteCustomerRes = await axios.delete(params.data.links[1].href);
                console.log("Customer deleted successfully!", deleteCustomerRes.data)
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
                await axios.put(link, customer, {
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
        floatingFilter: true,
        width: 150
    }

    // Ag grid columns
    const columns = [
        { headerName: 'First Name', field: 'firstname', ...columnProperties},
        { headerName: 'Last Name', field: 'lastname', ...columnProperties },
        { headerName: 'Street address', field: 'streetaddress', ...columnProperties, width: 200 },
        { headerName: 'Postcode', field: 'postcode', ...columnProperties },
        { headerName: 'City', field: 'city', ...columnProperties},
        { headerName: 'Email', field: 'email', ...columnProperties, width: 200},
        { headerName: 'Phone', field: 'phone', ...columnProperties},
        {
            cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
        , width: 150
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 150
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
                <div className="ag-theme-material" style={{ height: '70vh', width: 1500, margin: "auto" }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={8}
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