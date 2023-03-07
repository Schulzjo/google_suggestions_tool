import React, {useState} from 'react';
import './App.css';
import {
    Button,
    TextField,
} from "@mui/material"
import ResultCards from "./components/ResultCards";

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
            {data && <ResultCards result={data.message}/>}
        </div>
    );
}

export default App;
