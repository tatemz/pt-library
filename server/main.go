package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"gitlab.com/tatemz/pt-library/service"
)

func main() {

	var (
		httpAddr        = flag.String("http", ":8080", "http listen address")
		mongoHost       = flag.String("mongoHost", "localhost", "The mongo database host")
		mongoPort       = flag.String("mongoPort", "27017", "The mongo database port string")
		mongoDatabase   = flag.String("mongoDatabase", "", "The mongo database name")
		mongoCollection = flag.String("mongoCollection", "", "The mongo database collection name")
	)

	flag.Parse()
	ctx := context.Background()

	// Setup DB
	db, _ := service.CreateDatabase(*mongoHost, *mongoPort, *mongoDatabase, *mongoCollection)

	// Init service
	srv := service.NewService(db)

	// Create safe exit
	errChan := make(chan error)
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("%s", <-c)
	}()

	// Populate endpoints
	endpoints := service.Endpoints{
		HealthEndpoint:     service.MakeHealthEndpoint(srv),
		GetBooksEndpoint:   service.MakeGetBooksEndpoint(srv),
		GetBookEndpoint:    service.MakeGetBookEndpoint(srv),
		CreateBookEndpoint: service.MakeCreateBookEndpoint(srv),
		UpdateBookEndpoint: service.MakeUpdateBookEndpoint(srv),
		DeleteBookEndpoint: service.MakeDeleteBookEndpoint(srv),
	}

	// Start server
	go func() {
		log.Println("service is listening on port:", *httpAddr)
		handler := service.NewHTTPServer(ctx, endpoints)
		errChan <- http.ListenAndServe(*httpAddr, handler)
	}()

	log.Fatalln(<-errChan)
}
