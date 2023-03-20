# FROM node:14 as build-frontend
# WORKDIR /app
# COPY ./frontend/src ./src
# COPY ./frontend/*.* ./

# RUN npm install
# RUN npm run build

#FROM node:17 AS build
FROM node:18 AS build

# Create app directory
WORKDIR /app

# ARG NPM_TOKEN  
# COPY npmrc .npmrc  
COPY ./ ./

RUN npm install --legacy-peer-deps
RUN npm run build-client
#RUN npm run build-server

FROM node:18
WORKDIR /app
COPY --from=build /app/server/ ./server
COPY --from=build /app/shared/ ./shared
COPY --from=build /app/out/ ./out
COPY --from=build /app/node_modules/ ./node_modules
RUN npm install ts-node -g

ENV Env prod
ENV ResourcePrefix 'local'

EXPOSE 8080
#ENTRYPOINT ["./entrypoint.sh"]

CMD [ "ts-node", "./server/server.js" ]