import React, {useState} from 'react';
import './App.css';
import {
    Button,
    FormControl,
    TextField,
    Card, CardContent, Typography, Grid
} from "@mui/material"

interface ApiResponse {
    message: { [key: string]: string[] };
}

interface FormValues {
    keyword?: string;

}

function App() {

    const [data, setData] = useState<ApiResponse>();
    const [formValues, setFormValues] = useState<FormValues>({});
    const handleTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    function fetchData(keyword: string) {
        fetch("http://localhost:8000/" + keyword)
            .then(response => response.json())
            .then(d => setData({...d}))
    }

    function handleSubmit() {
        if (formValues.keyword) {
            fetchData(formValues.keyword);
        } else {
            console.log("no keyword");
        }

    }

    return (
        <div>
            <FormControl sx={{display: "flex", flexDirection: "row", padding: "10px"}}>
                <TextField
                    autoFocus
                    fullWidth
                    name="keyword"
                    label="Suchbegriff"
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
                <Button
                    sx={{ml: 1}}
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Suchen
                </Button>
            </FormControl>
            <Grid container spacing={12}>
                {data && Object.keys(data.message).map((key) => (
                    <Grid item xs={4}>
                        <Card variant="outlined" sx={{height: "250px", overflow: 'auto'}}>
                            <CardContent sx={{justify: "flex-start"}}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {key}
                                </Typography>
                                {data.message[key].map((value) => (
                                    <Typography variant="body1">{value}<br/></Typography>))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </div>
    );
}

export default App;
