FROM node:lts-slim

WORKDIR /app

COPY . .
COPY .env.local .env.local

RUN npm install
RUN npm run build

FROM node:lts-slim

WORKDIR /app

COPY --from=0 /app/.next /app/.next
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./public/ ./public/
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

ENTRYPOINT ["/app/entrypoint.sh"]
