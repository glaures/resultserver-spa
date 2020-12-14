FROM node:14-buster as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install autoprefixer
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf