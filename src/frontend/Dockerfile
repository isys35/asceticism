FROM node:20 AS builder

WORKDIR /asceticism

COPY . .

RUN npm install
RUN npm run build

FROM nginx:latest

WORKDIR /front_dist
COPY --from=builder /asceticism/dist .
