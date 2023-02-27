from fastapi import FastAPI
import requests
from fake_useragent import UserAgent

app = FastAPI()


@app.get("/{keyword}")
async def root(keyword: str):
    q = ['wer', 'wie', 'was']

    output = dict()

    for x in q:
        parameter = f'{x}+{keyword.replace(" ", "+")}'
        url = "http://suggestqueries.google.com/complete/search?output=firefox&q=" + parameter
        ua = UserAgent()
        headers = {"user-agent": ua.chrome}
        response = requests.get(url, headers=headers, verify=False)
        j = response.json()

        output[j[0]] = j[1]

    return {"message": output}
