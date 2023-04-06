import urllib.parse


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
