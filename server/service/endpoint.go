package service

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	GetBooksEndpoint   endpoint.Endpoint
	GetBookEndpoint    endpoint.Endpoint
	CreateBookEndpoint endpoint.Endpoint
	UpdateBookEndpoint endpoint.Endpoint
	DeleteBookEndpoint endpoint.Endpoint
	HealthEndpoint     endpoint.Endpoint
}

// MakeGetBooksEndpoint - GET /books/{isbn}
func MakeGetBooksEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		book, err := srv.GetBooks(ctx)
		return getBooksResponse{book, err}, nil
	}
}

// MakeGetBookEndpoint - GET /books/{isbn}
func MakeGetBookEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(getBookRequest)
		book, err := srv.GetBook(ctx, req.Isbn)
		return getBookResponse{book, err}, nil
	}
}

// MakeCreateBookEndpoint - POST /books
func MakeCreateBookEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(createBookRequest)
		book, err := srv.CreateBook(ctx, req.Book)
		return createBookResponse{book, err}, nil
	}
}

// MakeUpdateBookEndpoint - PUT /books/{isbn}
func MakeUpdateBookEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(updateBookRequest)
		book, err := srv.UpdateBook(ctx, req.Book)
		return updateBookResponse{book, err}, nil
	}
}

// MakeDeleteBookEndpoint - DELETE /books/{isbn}
func MakeDeleteBookEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(deleteBookRequest)
		_, err := srv.DeleteBook(ctx, req.Isbn)
		return deleteBookResponse{req.Isbn, err}, nil
	}
}

// MakeHealthEndpoint - GET /health
func MakeHealthEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		_ = request.(healthRequest)
		s, err := srv.Health(ctx)
		if err != nil {
			return healthResponse{s}, err
		}
		return healthResponse{s}, nil
	}
}

// GetBooks endpoint
func (e Endpoints) GetBooks(ctx context.Context) ([]Book, error) {
	req := getBooksRequest{}
	resp, err := e.GetBooksEndpoint(ctx, req)
	if err != nil {
		return []Book{}, err
	}
	getBooksResp := resp.(getBooksResponse)
	if getBooksResp.Error != nil {
		return []Book{}, getBooksResp.Error
	}
	return getBooksResp.Books, nil
}

// GetBook endpoint
func (e Endpoints) GetBook(ctx context.Context) (Book, error) {
	req := getBookRequest{}
	resp, err := e.GetBookEndpoint(ctx, req)
	if err != nil {
		return Book{}, err
	}
	getBookResp := resp.(getBookResponse)
	if getBookResp.Error != nil {
		return Book{}, getBookResp.Error
	}
	return getBookResp.Book, nil
}

// CreateBook endpoint
func (e Endpoints) CreateBook(ctx context.Context) (Book, error) {
	req := createBookRequest{}
	resp, err := e.CreateBookEndpoint(ctx, req)
	if err != nil {
		return Book{}, err
	}
	createBookResp := resp.(createBookResponse)
	if createBookResp.Error != nil {
		return Book{}, createBookResp.Error
	}
	return createBookResp.Book, nil
}

// UpdateBook endpoint
func (e Endpoints) UpdateBook(ctx context.Context) (Book, error) {
	req := updateBookRequest{}
	resp, err := e.UpdateBookEndpoint(ctx, req)
	if err != nil {
		return Book{}, err
	}
	updateBookResp := resp.(updateBookResponse)
	if updateBookResp.Error != nil {
		return Book{}, updateBookResp.Error
	}
	return updateBookResp.Book, nil
}

// DeleteBook endpoint
func (e Endpoints) DeleteBook(ctx context.Context) (string, error) {
	req := deleteBookRequest{}
	resp, err := e.DeleteBookEndpoint(ctx, req)
	if err != nil {
		return "", err
	}
	deleteBookResp := resp.(deleteBookResponse)
	if deleteBookResp.Error != nil {
		return "", deleteBookResp.Error
	}
	return deleteBookResp.Isbn, nil
}

// Health endpoint
func (e Endpoints) Health(ctx context.Context) (string, error) {
	req := healthRequest{}
	resp, err := e.HealthEndpoint(ctx, req)
	if err != nil {
		return "", err
	}
	healthResp := resp.(healthResponse)
	return healthResp.Health, nil
}
