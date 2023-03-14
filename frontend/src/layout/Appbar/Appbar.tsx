import {AppBar as AppBarMUI, Box, Button, Toolbar, Typography} from "@mui/material"
import {useMatch, useNavigate} from "react-router-dom";
import SearchField from "../../components/SearchField";
import React from "react";

interface AppbarProps {

}

const Appbar: React.FC<AppbarProps> = () => {
    const matchResultRoute = useMatch('/result/:param');
    const navigate = useNavigate();

    return (
        <AppBarMUI position="fixed">
            <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                <Box>
                    <Button variant="text"
                            sx={{color: "white"}}
                            onClick={() => navigate("/")}>
                        <Typography>gosuto</Typography>
                    </Button>
                </Box>
                <Box style={{width: "50%", margin: "0 auto", paddingTop: 10, paddingBottom: 10}}>
                    {matchResultRoute && <SearchField/>}
                </Box>
            </Toolbar>
        </AppBarMUI>
    )
}

export default Appbar