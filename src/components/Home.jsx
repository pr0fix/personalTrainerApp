import { Card, CardContent, CardCover, Container, Grid, Link, Typography } from "@mui/joy";
export default function Homepage() {
	return (
		<>
		<Container>
			
				<Typography 
					sx={{ 
						textAlign: 'center', 
						fontSize: '40px', 
						margin:'20px' 
					}} 
					level="title-lg"
				>	Welcome to my Personal Trainer App!
				</Typography>
					<Grid 
						container 
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
				
					<Grid item>
							<Card
								sx={{
									minWidth: 280,
									minHeight: 280,
								}}
							>
								<CardCover>
									<img
										src="images/customer.webp"
										alt="customer"
									/>
								</CardCover>
								<CardCover
									sx={{
										background:
											'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
									}}
								/>
								<CardContent
									sx={{ justifyContent: 'flex-end' }}
								>
									<Typography
										level="title-lg"
										textColor="#fff"
									>	Customers
									</Typography>
									<Typography
										level="body-sm"
									>
										<Link
											overlay
											underline="none"
											href="/personalTrainerApp/customers"
											sx={{ color: 'neutral.300' }}
										>	Press to see customers
										</Link>
									</Typography>
								</CardContent>
							</Card>
							</Grid>
							<Grid item>
							<Card
								sx={{
									minWidth: 280,
									minHeight: 280,
									
								}}>
								<CardCover>
									<img
										src="images/gym.webp"
										alt="gym"
									/>
								</CardCover>
								<CardCover
									sx={{
										background:
											'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
									}}
								/>

								<CardContent
									sx={{ justifyContent: 'flex-end' }}
								>
									<Typography
										level="title-lg"
										textColor="#fff"
									>
										Trainings
									</Typography>
									<Typography
										level="body-sm"
									>
										<Link
											overlay
											underline="none"
											href="/personalTrainerApp/trainings"
											sx={{ color: 'neutral.300' }}
										>
											Press to see trainings
										</Link>
									</Typography>
								</CardContent>
							</Card>
							</Grid>
							<Grid item>
							<Card
								sx={{
									minWidth: 280,
									minHeight: 280,
									
								}}>
								<CardCover>
									<img
										src="images/calendar.webp"
										alt="calendar"
									/>
								</CardCover>
								<CardCover
									sx={{
										background:
											'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
									}}
								/>

								<CardContent
									sx={{ justifyContent: 'flex-end' }}
								>
									<Typography
										level="title-lg"
										textColor="#fff"
									>
										Calendar
									</Typography>
									<Typography
										level="body-sm"
									>
										<Link
											overlay
											underline="none"
											href="/personalTrainerApp/trainingcalendar"
											sx={{ color: 'neutral.300' }}
										>
											Press to see calendar
										</Link>
									</Typography>
								</CardContent>
							</Card>
							</Grid>
							<Grid item>
							<Card
								sx={{
									minWidth: 280,
									minHeight: 280,
									
								}}>

								<CardCover>
									<img
										src="images/statistics.webp"
										alt="statistics"
									/>
								</CardCover>
								<CardCover
									sx={{
										background:
											'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
									}}
								/>

								<CardContent
									sx={{ justifyContent: 'flex-end' }}
								>
									<Typography
										level="title-lg"
										textColor="#fff">
										Statistics
									</Typography>
									<Typography
										level="body-sm"
									>
										<Link
											overlay
											underline="none"
											href="/personalTrainerApp/trainingstats"
											sx={{ color: 'neutral.300' }}
										>
											Press to see statistics
										</Link>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					</Container>
		</>);
}