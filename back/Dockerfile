FROM python:3.7-alpine

RUN mkdir -p /usr/src/app
ENV PORT 5000

WORKDIR /usr/src/app

RUN apk add --no-cache gcc musl-dev linux-headers

COPY . /usr/src/app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0"]