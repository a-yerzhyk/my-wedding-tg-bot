# build stage
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_APP_ENV=production
RUN npm run build

# production stage
FROM nginx:mainline-alpine AS production-stage
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]