from fastapi import FastAPI
import requests
from fake_useragent import UserAgent
from fastapi.middleware.cors import CORSMiddleware
from .utils import generate_api_url
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{keyword}")
async def root(keyword: str):
    question_words = ['wer', 'wie', 'was', 'wo', 'wann', 'warum']
    ua = UserAgent()

    output = dict()

    for q in question_words:

        url = generate_api_url(q, keyword)

        headers = {"user-agent": ua.chrome}
        response = requests.get(url, headers=headers, verify=False)
        j = response.json()
        print(j)
        output[j[0]] = j[1]
    print(output)
    return {"message": output}
