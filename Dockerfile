FROM node:22-slim

RUN npx -y playwright@1.52.0 install --with-deps

COPY . /docker_e2e

