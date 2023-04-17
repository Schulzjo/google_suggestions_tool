import asyncio
import json
import time
import urllib.parse
from fake_useragent import UserAgent
import requests


def generate_api_url(question_word: str, keyword: str, output_format: str = "chrome"):
    """
    convert keyword to correct format and returns api url containing question word and keyword
    :param question_word: str
    question words which gets inserted before keyword string
    :param keyword: str
    one or multiple words of interest
    :param output_format: str
    output format which result in different api responses depending on the format
    e.g. firefox or chrome, default is chrome. Response differences are not complete clear yet due to lack of
    documentation and the fact that the usage of this api is not officially supported
    setting this to chrome give some additional information in the response

    :return: api url as string
    """

    parameter = urllib.parse.quote(f'{question_word} {keyword}')
    return f"http://suggestqueries.google.com/complete/search?output={output_format}&q={parameter}"


async def call_api(url: str, session):
    """
    adds user agen to request, calls given url and returns response as json
    :param url: str
    api url
    :return: response as json
    looks like this:
    ['wer mauntainbike', ['wer hat mountainbike erfunden', 'wer sucht mountainbike'],
                            ['', ''], [], {'google:clientdata': {'bpc': False, 'tlw': False},
                                           'google:suggestrelevance': [601, 600],
                                           'google:suggestsubtypes': [[8, 30, 13], [8, 30, 13]],
                                           'google:suggesttype': ['QUERY', 'QUERY'],
                                           'google:verbatimrelevance': 1300}]
    """

    ua = UserAgent()
    headers = {"user-agent": ua.chrome}
    try:
        async with session.get(url, headers=headers, verify_ssl=False) as response:
            resp = await response.read()
            return json.loads(resp)
    except Exception as e:
        # TODO: add some error handling
        print(e)
        pass
