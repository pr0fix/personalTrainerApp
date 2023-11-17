import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

export default function App() {


  return (
    <>
    <nav>
        <Link to={"/"}>
			<Button>Home</Button>
		</Link>

		<Link to="/customer">
			<Button>Customer</Button>
		</Link>

		<Link to="/training">
			<Button>Training</Button>
		</Link>


    </nav>
      <Outlet/>
    </>
  )
}