# ---------------------------------------------------------------------------- #
#                              development target                              #
# ---------------------------------------------------------------------------- #
FROM node:14.16.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci && NG_CLI_ANALYTICS=ci npm i -g @angular/cli

# ---------------------------------------------------------------------------- #
#                               production target                              #
# ---------------------------------------------------------------------------- #
FROM node:14.16.0-alpine AS build
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

FROM nginxinc/nginx-unprivileged:1.20.0-alpine as production
COPY --from=build /app/dist/ng-new /usr/share/nginx/html
COPY docker/pwa/nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
