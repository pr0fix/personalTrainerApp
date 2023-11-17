import { Link, Outlet } from "react-router-dom";
import { AppBar, Button, Typography } from "@mui/material";

export default function App() {


  return (
    <>
      <AppBar style={{textAlign:"center"}} position="static">
        <Typography variant="h6">
          Personal trainer app
        </Typography>
      </AppBar>

      <nav style={{ padding: "10px", display: "flex", justifyContent:"center" }}>
        <Link to={"/"}>
          <Button variant="outlined" >Home</Button>
        </Link>

        <Link to="/customer">
          <Button variant="outlined" >Customers</Button>
        </Link>

        <Link to="/training">
          <Button variant="outlined" >Trainings</Button>
        </Link>


      </nav>
      <Outlet />
    </>
  )
}