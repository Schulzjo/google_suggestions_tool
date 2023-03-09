import {useParams} from "react-router-dom"
import ResultCards from "../components/ResultCards";
import React, {useEffect, useState} from "react";

interface ApiResponse {
    message: { [key: string]: string[] };
}

const ResultPage = () => {
    const {param} = useParams();
    const [data, setData] = useState<ApiResponse>();

    function fetchData(keyword: string) {
        fetch("http://localhost:8000/" + keyword)
            .then(response => response.json())
            .then(d => setData({...d}))
    }

    useEffect(() => {
            if (param) {
                fetchData(param);
            } else {
                console.log("no keyword");
            }
        }, [param]);

    return (
        <div>
            {data && <ResultCards result={data.message}/>}
        </div>
    )
}

export default ResultPage