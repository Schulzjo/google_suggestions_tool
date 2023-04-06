from backend.utils import generate_api_url


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