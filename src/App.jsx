import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

export default function App() {


  return (
    <>
      <nav>
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