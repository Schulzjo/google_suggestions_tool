from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


# TODO: mock requests.get
def test_get_suggestions():
    response = client.get("/mountainbike")
    assert response.status_code == 200

