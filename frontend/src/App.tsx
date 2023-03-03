import React, {useState} from 'react';
import './App.css';

interface ApiResponse {
    message: { [key: string]: string[] };
}


function App() {

    const [data, setData] = useState<ApiResponse>();

    function fetchData(keyword: string) {
        fetch("http://localhost:8000/" + keyword)
            .then(response => response.json())
            .then(d => setData({...d}))
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        fetchData(event.target.keyword.value);
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" name="keyword" placeholder="keyword"/>
                <button>Submit</button>
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
            </form>

        </div>
    );
}

export default App;
