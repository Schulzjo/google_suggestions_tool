import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";

interface FormValues {
    keyword?: string;
}

const SearchFieldPage = () => {

    const [formValues, setFormValues] = useState<FormValues>({});
    const [submitted, setSubmitted] = useState(false);

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
            setSubmitted(true);
            console.log("navigate to resultpage");
        } else {
            setSubmitted(false);
        }

    }
    if (submitted) {
        return <Navigate to={"/result/" +formValues.keyword}/>
    } else {
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
}

export default SearchFieldPage