from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from utils.api_helpers import generate_api_url, call_api
import timeit
import asyncio

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
    async with aiohttp.ClientSession() as session:
        ret = await asyncio.gather(
            *[call_api(url, session) for url in [generate_api_url(q, keyword) for q in question_words]])

    for jr in ret:
        output[jr[0]] = jr[1]

        url = generate_api_url(q, keyword)

        json_response = call_api(url)

        output[json_response[0]] = json_response[1]

    return {"message": output}
