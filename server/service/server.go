package service

import (
	"context"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// NewHTTPServer is a good little server
func NewHTTPServer(ctx context.Context, endpoints Endpoints) http.Handler {
	r := mux.NewRouter()
	r.Use(commonMiddleware)
	opts := []httptransport.ServerOption{
		httptransport.ServerErrorEncoder(encodeError),
	}

	r.Methods("GET").Path("/health").Handler(httptransport.NewServer(
		endpoints.HealthEndpoint,
		decodeHealthRequest,
		encodeResponse,
		opts...,
	))

	r.Methods("GET").Path("/books").Handler(httptransport.NewServer(
		endpoints.GetBooksEndpoint,
		decodeGetBooksRequest,
		encodeResponse,
	))

	r.Methods("GET").Path("/books/{isbn}").Handler(httptransport.NewServer(
		endpoints.GetBookEndpoint,
		decodeGetBookRequest,
		encodeResponse,
	))

	r.Methods("POST").Path("/books").Handler(httptransport.NewServer(
		endpoints.CreateBookEndpoint,
		decodeCreateBookRequest,
		encodeResponse,
	))

	r.Methods("PUT").Path("/books/{isbn}").Handler(httptransport.NewServer(
		endpoints.UpdateBookEndpoint,
		decodeUpdateBookRequest,
		encodeResponse,
	))

	r.Methods("DELETE").Path("/books/{isbn}").Handler(httptransport.NewServer(
		endpoints.DeleteBookEndpoint,
		decodeDeleteBookRequest,
		encodeResponse,
	))

	return handlers.CORS(handlers.AllowedMethods([]string{"OPTIONS", "POST", "PUT", "DELETE", "GET"}), handlers.AllowedOrigins([]string{"*"}))(r)
}

func commonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
