FROM 942928664695.dkr.ecr.eu-central-1.amazonaws.com/node:15-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM 942928664695.dkr.ecr.eu-central-1.amazonaws.com/nginx:1.19-alpine
ADD nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/h24-frontend-angular /usr/share/nginx/html
