# build environment
FROM node:20.10.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH



COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@10.8.2
RUN npm install -f
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 30021
CMD ["nginx", "-g", "daemon off;"]
