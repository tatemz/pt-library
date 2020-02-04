package service

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type getBooksRequest struct{}

type getBooksResponse struct {
	Books []Book `json:"books"`
	Error error  `json:"error,omitempty"`
}

func (r getBooksResponse) error() error { return r.Error }

type getBookRequest struct {
	Isbn string `json:"isbn"`
}

type getBookResponse struct {
	Book  Book  `json:"book"`
	Error error `json:"error,omitempty"`
}

func (r getBookResponse) error() error { return r.Error }

type createBookRequest struct {
	Book Book `json:"book"`
}

type createBookResponse struct {
	Book  Book  `json:"book"`
	Error error `json:"error,omitempty"`
}

func (r createBookResponse) error() error { return r.Error }

type updateBookRequest struct {
	Book Book `json:"book"`
}

type updateBookResponse struct {
	Book  Book  `json:"book"`
	Error error `json:"error,omitempty"`
}

func (r updateBookResponse) error() error { return r.Error }

type deleteBookRequest struct {
	Isbn string `json:"isbn"`
}

type deleteBookResponse struct {
	Isbn  string `json:"isbn"`
	Error error  `json:"error,omitempty"`
}

func (r deleteBookResponse) error() error { return r.Error }

type healthRequest struct{}

type healthResponse struct {
	Health string `json:"status"`
}

func decodeGetBooksRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	req := getBooksRequest{}
	return req, nil
}

func decodeGetBookRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	urlVars := mux.Vars(r)
	req := getBookRequest{Isbn: urlVars["isbn"]}
	return req, nil
}

func decodeCreateBookRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req createBookRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}
	return req, nil
}

func decodeUpdateBookRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	urlVars := mux.Vars(r)
	var req updateBookRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}

	req.Book.Isbn = urlVars["isbn"]
	return req, nil
}

func decodeDeleteBookRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	urlVars := mux.Vars(r)
	req := deleteBookRequest{Isbn: urlVars["isbn"]}
	return req, nil
}

func decodeHealthRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req healthRequest
	return req, nil
}

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	e, ok := response.(responseError)
	if ok && e.error() != nil {
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

type responseError interface {
	error() error
}

func encodeError(_ context.Context, err error, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	switch err {
	case ErrBookAbsent:
		w.WriteHeader(http.StatusNotFound)
	case ErrBookExists, ErrBookDetailsRequired:
		w.WriteHeader(http.StatusBadRequest)
	default:
		w.WriteHeader(http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
