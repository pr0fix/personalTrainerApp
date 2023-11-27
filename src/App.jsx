import { Link, Outlet, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import { Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from "./components/Footer";
import { useState } from "react";

// Constructs buttons for navigation
const NavLinkButton = ({ to, label, currentPath, handleNavbarCollapse }) => {
	return (
		<Link to={to} onClick={handleNavbarCollapse}>
			<Container style={{padding:'5px', paddingLeft:'0', margin:"0"}}>
			<Button
				style={{ color: 'white', padding: '8px 16px'}}
				variant={currentPath === to ? "contained" : "text"}
			>
				{label}
			</Button>
			</Container>
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

	const [navbarExpanded, setNavbarExpanded] = useState(false);

	const location = useLocation();
	const pageTitle = getPageTitle(location.pathname);

	const handleNavbarCollapse = () => {
		setNavbarExpanded(false);
	}

	return (


		<>
			<Navbar
				expand="lg"
				expanded={navbarExpanded}
				style={{ backgroundColor: "#005c8d" }}
			>
				<Container fluid>
					<Container style={{ display: 'flex', flexDirection: 'row'}}>
						<Navbar.Brand href="/personalTrainerApp/" className="me-auto" style={{ color: 'white', fontWeight:'bold' }}>Personal Trainer App</Navbar.Brand>
						<Navbar.Text className="me-auto" style={{ fontSize: '18px', color: 'white', fontWeight:'bold' }}>{pageTitle}</Navbar.Text>
					</Container>
					<NavbarToggle 
					onClick={() => setNavbarExpanded(!navbarExpanded)}
					aria-controls="navbar-nav" />

					<NavbarCollapse id="navbar-nav">

						<Nav style={{ gap: '5px' }} className="ms-auto">
							<NavLinkButton to="/personalTrainerApp/" label="Home" currentPath={location.pathname} handleNavbarCollapse={handleNavbarCollapse}/>
							<NavLinkButton to="/personalTrainerApp/customers" label="Customers" currentPath={location.pathname} handleNavbarCollapse={handleNavbarCollapse}/>
							<NavLinkButton to="/personalTrainerApp/trainings" label="Trainings" currentPath={location.pathname} handleNavbarCollapse={handleNavbarCollapse}/>
							<NavLinkButton to="/personalTrainerApp/trainingcalendar" label="Calendar" currentPath={location.pathname} handleNavbarCollapse={handleNavbarCollapse}/>
							<NavLinkButton to="/personalTrainerApp/trainingstats" label="Statistics" currentPath={location.pathname} handleNavbarCollapse={handleNavbarCollapse}/>
						</Nav>
					</NavbarCollapse>
				</Container>
			</Navbar>
			<Outlet />
			<Footer />
		</>
	)
}