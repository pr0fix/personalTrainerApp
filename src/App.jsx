import { Link, Outlet, useLocation } from "react-router-dom";
import { AppBar, Button, Typography } from "@mui/material";

export default function App() {

  const location = useLocation();


  return (
    <>
      <AppBar style={{ textAlign: "center" }} position="static">
        <Typography variant="h6">
          Personal trainer app
        </Typography>
      </AppBar>

      <nav style={{ padding: "10px", display: "flex", justifyContent: "center", gap: "5px" }}>
        <Link to={"/"}>
          <Button variant={location.pathname === '/' ? "contained" : "outlined"}>Home</Button>
        </Link>

        <Link to="/customer">
          <Button variant={location.pathname === '/customer' ? "contained" : "outlined"}>Customers</Button>
        </Link>

        <Link to="/training">
          <Button variant={location.pathname === '/training' ? "contained" : "outlined"}>Trainings</Button>
        </Link>

        <Link to="/trainingcalendar">
          <Button variant={location.pathname === '/trainingcalendar' ? "contained" : "outlined"}>Calendar</Button>
        </Link>
        <Link to="/trainingstats">
          <Button variant={location.pathname === '/trainingstats' ? "contained" : "outlined"}>Stats</Button>
        </Link>
      </nav>
      <Outlet />
    </>
  )
}