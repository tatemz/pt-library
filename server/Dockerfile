# Build Image
FROM golang:1.13-alpine as build
RUN apk update \
  && apk add git build-base gcc abuild binutils binutils-doc gcc-doc \
  && rm -rf /var/cache/apk/*

ENV GO111MODULE=on
WORKDIR /app
COPY . .
RUN go get ./...
RUN make build

# Runtime Image
FROM alpine
WORKDIR /app
COPY --from=build /app/dist/ptlibrary_linux_x86 /app/ptlibrary_linux_x86
EXPOSE 8080
ENTRYPOINT ["/app/ptlibrary_linux_x86"]
