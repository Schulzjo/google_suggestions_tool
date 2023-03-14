import React from 'react';
import './App.css';
import {alpha, Box, createTheme, lighten, ThemeProvider} from "@mui/material"

import Layout from "./layout";
import Routes from "./Routes";

export const COLOR_MAIN = "#400554"
export const COLOR_SECOND = "#810CA8"
export const COLOR_THIRD = "#C147E9"
export const COLOR_FOURTH = "#E5B8F4"


const theme = createTheme({

    palette: {
        primary: {
            contrastText: "#fff",
            dark: COLOR_MAIN,
            light: lighten(COLOR_MAIN, 0.5),
            main: COLOR_MAIN
        },
        secondary: {
            contrastText: lighten(COLOR_SECOND, 0.2),
            dark: COLOR_SECOND,
            light: "#fff",
            main: "#fff",
        },

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: COLOR_SECOND
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: COLOR_MAIN
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(COLOR_FOURTH, 0.15),
                    ".MuiInputBase-input": {
                        color: COLOR_SECOND,
                    },
                    "&:hover": {
                        backgroundColor: alpha(COLOR_FOURTH, 0.35),
                    },
                    "&.Mui-focused": {
                        backgroundColor: alpha(COLOR_FOURTH, 0.35),
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: COLOR_THIRD
                    },
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                            borderColor: COLOR_SECOND
                        }
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                            borderColor: COLOR_SECOND
                        }
                    },
                    label: {
                        color: COLOR_SECOND,
                        "&.Mui-focused": {
                            color: COLOR_SECOND,
                            margin: 5,
                        }
                    },


                }
            }
        }

    }

})

function App() {

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Box className="WaveBackground" sx={{flexGrow: 1, p: 3, pt: 10}}>
                    <Routes/>
                </Box>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
