# Build Image
FROM node:alpine AS build
WORKDIR /usr/src/app
RUN apk update \
  && apk add git automake build-base gcc abuild binutils binutils-doc gcc-doc autoconf \
  && rm -rf /var/cache/apk/*
COPY package*.json /usr/src/app/
RUN npm install
COPY ./ /usr/src/app
RUN npm run build \
  && npm prune --production

# Runtime Image
FROM node:alpine AS runtime
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]