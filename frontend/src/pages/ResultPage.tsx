import {useParams} from "react-router-dom"
import ResultCards from "../components/ResultCards";
import React, {useEffect, useState} from "react";
import {Alert, CircularProgress} from "@mui/material";

interface ApiResponse {
    message: { [key: string]: string[] };
}

const ResultPage = () => {
    const {param} = useParams();
    const [data, setData] = useState<ApiResponse>();
    let [isLoading, setIsLoading] = useState<boolean>(true)
    let [error, setError] = useState<string>("")

    function fetchData(keyword: string) {
        setIsLoading(true)
        fetch("http://localhost:8000/" + keyword)
            .then(response => response.json())
            .then(d => setData({...d}))
            .then(() => setIsLoading(false))
            .catch((error) => {
                    console.log(error)
                    setError(error.message)
                    setIsLoading(false)
                }
            )
    }

    useEffect(() => {
        if (param) {
            fetchData(param);
        } else {
            console.log("no keyword");
            setError("No keyword found")
        }
    }, [param]);

    if (isLoading) {
        return (
            <div className={"LoadingIndicator"}>
                <CircularProgress size={60}/>
            </div>
        )
    } else if (error) {
        return (
            <div>
                <Alert severity="error">{error}</Alert>
            </div>
        )
    } else {
        return (
            <div>
                {data && <ResultCards result={data.message}/>}
            </div>
        )
    }
}

export default ResultPage