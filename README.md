# google_suggestions_tool
Small fun project which uses the Google suggestion api to generate the most frequently searched questions for a keyword

Repository is actually work in progress.

# Start backend
`cd backend && uvicorn main:app --reload`

# request suggestions
Send request with keyword to `http://localhost:8000/{keyword}`

e.g.:
`curl --request GET --url http://127.0.0.1:8000/mountainbike`