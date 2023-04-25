
FROM python:3.8

RUN pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt ./requirements.txt


RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY . ./backend

ENV PYTHONPATH /app/backend