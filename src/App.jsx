import { Link, Outlet, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css'

// Constructs buttons for navigation
const NavLinkButton = ({ to, label, currentPath }) => {
	return (
		<Link to={to}>
			<Button style={{ color: 'white', padding: '8px 16px' }} variant={currentPath === to ? "contained" : "text"}>
				{label}
			</Button>
		</Link>
	);
};

const getPageTitle = (pathname) => {
	const mapTitles = {
		"/personalTrainerApp/": "Homepage",
		"/personalTrainerApp/customers": "Customers",
		"/personalTrainerApp/trainings": "Trainings",
		"/personalTrainerApp/trainingcalendar": "Training calendar",
		"/personalTrainerApp/trainingstats": "Training statistics",
	};
	return mapTitles[pathname];
}


export default function App() {

	const location = useLocation();
	const pageTitle = getPageTitle(location.pathname);

	return (
		<>
			<Navbar style={{ backgroundColor: "#005c8d" }}>
				<Container fluid>
					<Navbar.Brand className="me-auto" style={{ color: 'white' }}>Personal Trainer App</Navbar.Brand>
					<Navbar.Text className="ms-auto" style={{ fontSize: '20px', color: 'white' }}>{pageTitle}</Navbar.Text>
					<Nav style={{ gap: '5px' }} className="ms-auto">
						<NavLinkButton to="/personalTrainerApp/" label="Home" currentPath={location.pathname} />
						<NavLinkButton to="/personalTrainerApp/customers" label="Customers" currentPath={location.pathname} />
						<NavLinkButton to="/personalTrainerApp/trainings" label="Trainings" currentPath={location.pathname} />
						<NavLinkButton to="/personalTrainerApp/trainingcalendar" label="Calendar" currentPath={location.pathname} />
						<NavLinkButton to="/personalTrainerApp/trainingstats" label="Statistics" currentPath={location.pathname} />
					</Nav>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}