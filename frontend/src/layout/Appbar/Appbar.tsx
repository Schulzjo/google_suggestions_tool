import {AppBar as AppBarMUI, Box, Toolbar, Typography} from "@mui/material"
import {useMatch, useNavigate} from "react-router-dom";
import SearchField from "../../components/SearchField";
import React from "react";

interface AppbarProps {

}

const Appbar: React.FC<AppbarProps> = () => {
    const matchResultRoute = useMatch('/result/:param');
    console.log(matchResultRoute?.params.param);

    return (
        <AppBarMUI position="fixed">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography>Google Suggestion Tool</Typography>
                </Box>
                <Box style={{ width: "50%", margin: "0 auto" }}>
                    {matchResultRoute && <SearchField/>}
                </Box>
            </Toolbar>
        </AppBarMUI>
    )
}

export default Appbar