import React from 'react';
import './App.css';
import {Box} from "@mui/material"

import Layout from "./layout";
import Routes from "./Routes";

function App() {

    return (
        <Layout>
            <Box sx={{flexGrow: 1, p: 3, pt: 10}}>
                <Routes/>
            </Box>
        </Layout>
    );
}

export default App;
