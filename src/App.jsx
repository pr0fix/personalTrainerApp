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
        <Link to={"/personalTrainerApp"}>
          <Button variant={location.pathname === '/personalTrainerApp' ? "contained" : "outlined"}>Home</Button>
        </Link>

        <Link to="/personalTrainerApp/customer">
          <Button variant={location.pathname === '/personalTrainerApp/customer' ? "contained" : "outlined"}>Customers</Button>
        </Link>

        <Link to="/personalTrainerApp/training">
          <Button variant={location.pathname === '/personalTrainerApp/training' ? "contained" : "outlined"}>Trainings</Button>
        </Link>

        <Link to="/personalTrainerApp/trainingcalendar">
          <Button variant={location.pathname === '/personalTrainerApp/trainingcalendar' ? "contained" : "outlined"}>Calendar</Button>
        </Link>
        <Link to="/personalTrainerApp/trainingstats">
          <Button variant={location.pathname === '/personalTrainerApp/trainingstats' ? "contained" : "outlined"}>Stats</Button>
        </Link>
      </nav>
      <Outlet />
    </>
  )
}