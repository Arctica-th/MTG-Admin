# get the base node image
FROM node:16.15.1-alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend

# install npm dependencies
RUN npm install
#RUN npm install react-scripts@3.4.1 -g --silent

# copy other project files
COPY . .

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx
COPY --from=builder /frontend/build /usr/share/nginx/html
#COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
