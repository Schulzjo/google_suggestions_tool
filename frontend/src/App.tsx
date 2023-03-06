import React, {useState} from 'react';
import './App.css';
import {
    Button,
    FormControl,
    TextField,
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
        <div className="App">
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
            <div className={"list centered"}>
                <ul>
                    {data && Object.keys(data.message).map((key) => (
                        <li>{key}
                            <ul>
                                {data.message[key].map((value) => (<li>{value}</li>))}
                            </ul>
                        </li>
                    ))
                    }</ul>
            </div>
        </div>
    );
}

export default App;
