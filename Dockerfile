FROM node:16 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/client /usr/share/nginx/html

