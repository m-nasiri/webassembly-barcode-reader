FROM python:3-alpine

COPY index.html .
COPY assets/ assets/

EXPOSE 7000
CMD python -m http.server 7000
