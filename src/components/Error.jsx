import { Button } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {

    // Shows an error page when user navigates to an URL that doesn't exist
    const error = useRouteError();
    console.log(error);
    return (
        <>
            <h1>You've diven into the abyss, page not found!</h1>
            <p>{error.data}</p>
            <Link to="/personalTrainerApp/">
                <Button 
                    sx={{marginLeft:'5px'}}
                    variant="contained"
                >
                    Back to app
                </Button>
            </Link>
        </>
    )
}