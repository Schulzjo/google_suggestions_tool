from fastapi.testclient import TestClient
from backend.main import app
from requests_mock import ANY

client = TestClient(app)


def test_get_suggestions(requests_mock):
    requests_mock.get(ANY, json=["wer wie was", ["sugestion1", "sugestion2"]])
    response = client.get("/mountainbike")

    assert response.status_code == 200
    assert requests_mock.call_count == 3  # 3 requests are made for q = ['wer', 'wie', 'was']
