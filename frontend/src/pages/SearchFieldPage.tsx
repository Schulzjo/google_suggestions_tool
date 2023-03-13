import React, {useState} from "react";
import SearchField from "../components/SearchField";
import {Box, Grid} from "@mui/material";


const SearchFieldPage = () => {


    return (

        <Grid style={{height: '70vh', alignItems:"center", justifyContent:"center", display: "flex"}}>
            <Box border={1} borderRadius={3} p={10} boxShadow={3} width={"50%"} >
                <SearchField/>
            </Box>
        </Grid>

    );
}

export default SearchFieldPage