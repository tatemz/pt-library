package service

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

// Service provides some "date capabilities" to your application
type Service interface {
	Health(ctx context.Context) (string, error)
	GetBooks(ctx context.Context) ([]Book, error)
	GetBook(ctx context.Context, isbn string) (Book, error)
	CreateBook(ctx context.Context, book Book) (Book, error)
	UpdateBook(ctx context.Context, book Book) (Book, error)
	DeleteBook(ctx context.Context, isbn string) (Book, error)
}

type libraryService struct {
	dbClient Database
}

// NewService makes a new Service.
func NewService(db Database) Service {
	return libraryService{dbClient: db}
}

// Health ECV
func (libraryService) Health(ctx context.Context) (string, error) {
	return "ok", nil
}

// Get all books
func (l libraryService) GetBooks(ctx context.Context) ([]Book, error) {
	var books []Book

	ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
	cur, err := l.dbClient.col.Find(ctx, bson.D{{}})

	if err != nil {
		return books, err
	}

	for cur.Next(ctx) {
		var book Book
		if err := cur.Decode(&book); err != nil {
			return books, err
		}
		books = append(books, book)
	}

	if err := cur.Err(); err != nil {
		return books, err
	}

	return books, nil
}

// Get book by ISBN
func (l libraryService) GetBook(ctx context.Context, isbn string) (Book, error) {
	var book Book

	if isbn == "" {
		return book, errors.New("An isbn is required")
	}

	filter := bson.M{"isbn": isbn}
	ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
	err := l.dbClient.col.FindOne(ctx, filter).Decode(&book)

	if err != nil {
		return book, ErrBookAbsent
	}

	return book, nil
}

// Create book
func (l libraryService) CreateBook(ctx context.Context, book Book) (Book, error) {
	if (Book{} == book || book.Isbn == "") {
		return Book{}, ErrBookDetailsRequired
	}

	b, _ := l.GetBook(ctx, book.Isbn)
	if b.Isbn == book.Isbn {
		return Book{}, ErrBookExists
	}

	ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
	_, err := l.dbClient.col.InsertOne(ctx, book)

	if err != nil {
		return Book{}, err
	}

	return book, nil
}

// Update book
func (l libraryService) UpdateBook(ctx context.Context, book Book) (Book, error) {
	var response Book

	if (Book{} == book || book.Isbn == "") {
		return response, ErrBookDetailsRequired
	}

	_, e := l.GetBook(ctx, book.Isbn)
	if e != nil {
		return response, e
	}

	filter := bson.M{"isbn": book.Isbn}
	update := bson.M{"$set": &book}

	_, err := l.dbClient.col.UpdateOne(ctx, filter, update)
	if err != nil {
		return response, errors.New("Could not update book")
	}

	return book, nil
}

// Delete book by ISBN
func (l libraryService) DeleteBook(ctx context.Context, isbn string) (Book, error) {
	var result Book

	_, e := l.GetBook(ctx, isbn)
	if e != nil {
		return result, e
	}

	filter := bson.M{"isbn": isbn}
	ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
	_, err := l.dbClient.col.DeleteOne(ctx, filter)

	if err != nil {
		return result, errors.New("Could not delete book with isbn")
	}

	return result, nil
}

type ServiceMiddleware func(Service) Service
