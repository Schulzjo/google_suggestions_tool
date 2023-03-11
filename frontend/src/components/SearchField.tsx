import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

interface FormValues {
    keyword?: string;
}

const SearchField = () => {

    const [formValues, setFormValues] = useState<FormValues>({});
    const navigate = useNavigate();

    const handleTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formValues.keyword) {
            //fetchData(formValues.keyword);
            console.log("navigate to resultpage");
            navigate("/result/" + formValues.keyword);
        } else {
            console.log('no keyword');
        }

    }

    return (
        <div>
            <form style={{display: "inline-flex", flexDirection: "row", width: "100%"}}
                  onSubmit={handleSubmit}>
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
        </div>
    );

}

export default SearchField