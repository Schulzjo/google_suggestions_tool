from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from utils.api_helpers import generate_api_url, call_api

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

    output = dict()

    for q in question_words:

        url = generate_api_url(q, keyword)

        json_response = call_api(url)

        output[json_response[0]] = json_response[1]

    return {"message": output}
