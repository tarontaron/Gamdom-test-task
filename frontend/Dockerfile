FROM node:22-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package.json  ./

RUN npm i

COPY . .

RUN npm run build

# Use a lightweight runtime image
FROM node:22-alpine

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["serve", "-p", "8080", "-s", "dist"]
