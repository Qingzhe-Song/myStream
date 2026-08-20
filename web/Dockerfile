FROM node:24-slim AS build
WORKDIR /web
COPY . .
RUN npm ci
RUN npm run build

FROM nginx
COPY --from=build /web/nginx/web-container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /web/dist /usr/share/nginx/html
EXPOSE 5173