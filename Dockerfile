# Usando a imagem oficial do Node.js para construir o projeto Angular
FROM node:16 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Usando uma imagem do Nginx para servir a aplicação Angular
FROM nginx:alpine
COPY --from=build /app/dist/client /usr/share/nginx/html
