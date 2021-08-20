FROM node:14.16.0-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN chown -R node:node /app
USER node
RUN npm ci
RUN npm run build:prod

FROM nginxinc/nginx-unprivileged:1.20.0-alpine as production
COPY --from=build /app/dist/ng-new /usr/share/nginx/html
COPY docker/ng-new/nginx.conf /etc/nginx/nginx.conf
COPY docker/ng-new/ssl /etc/nginx/ssl
EXPOSE 8080
EXPOSE 443
