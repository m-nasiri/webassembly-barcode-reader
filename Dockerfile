FROM python:3-alpine

COPY res/* /
COPY bin/* /

EXPOSE 7000
CMD python -m http.server 7000
