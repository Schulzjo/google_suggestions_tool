import React, {useState} from 'react';
import './App.css';
import {
    Button,
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formValues.keyword) {
            fetchData(formValues.keyword);
        } else {
            console.log("no keyword");
        }

    }

    return (
        <div style={{margin:"10px"}}>
            <form style={{ display: "inline-flex", flexDirection: "row", width: "100%"}} onSubmit={handleSubmit}>
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
                    >
                        Suchen
                    </Button>
            </form>
            <Grid container spacing={12} sx={{padding: "10px"}}>
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
