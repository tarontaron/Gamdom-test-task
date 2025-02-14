# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:22-alpine

WORKDIR /app

COPY package*.json .
RUN npm install --production

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]
EXPOSE 3000
