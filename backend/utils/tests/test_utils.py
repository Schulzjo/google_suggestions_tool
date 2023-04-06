import json

from backend.utils.utils import generate_api_url, call_api
from requests_mock import ANY


def test_generate_api_url():
    # single keyword
    assert generate_api_url("wer",
                            "mountainbike") == 'http://suggestqueries.google.com/complete/search?output=chrome&q=wer%20mountainbike'

    # multiple keywords
    assert generate_api_url("wer",
                            "mountain bike") == "http://suggestqueries.google.com/complete/search?output=chrome&q=wer%20mountain%20bike"

    # multiple keywords with special characters
    assert generate_api_url("wer",
                            "mountain bike & co") == "http://suggestqueries.google.com/complete/search?output=chrome&q=wer%20mountain%20bike%20%26%20co"


# test call_api function with mocked request method
def test_call_api(requests_mock):

    mocked_json_response = ['wer mauntainbike', ['wer hat mountainbike erfunden', 'wer sucht mountainbike'],
                            ['', ''], [], {'google:clientdata': {'bpc': False, 'tlw': False},
                                           'google:suggestrelevance': [601, 600],
                                           'google:suggestsubtypes': [[8, 30, 13], [8, 30, 13]],
                                           'google:suggesttype': ['QUERY', 'QUERY'],
                                           'google:verbatimrelevance': 1300}]
    requests_mock.get(ANY,
                      json=mocked_json_response
                      )
    api_url = "http://suggestqueries.google.com/complete/search?output=chrome&q=wer%20mountainbike"

    json_response = call_api(api_url)

    assert json_response == mocked_json_response
    # check if only single request was made
    assert requests_mock.call_count == 1
    # check if request was called with api_url
    assert requests_mock.request_history[0].url == api_url
    # check if user agent is added to request
    assert requests_mock.request_history[0].headers["user-agent"]



