package service

import "errors"

type Book struct {
	Isbn        string `json:"isbn" bson:"isbn"`
	Title       string `json:"title" bson:"title"`
	Author      string `json:"author" bson:"author"`
	Description string `json:"description" bson:"description"`
	Checked     bool   `json:"checked" bson:"checked"`
}

var ErrBookExists = errors.New("A book with that isbn already exists")
var ErrBookAbsent = errors.New("A book with that isbn does not exist")
var ErrBookDetailsRequired = errors.New("You must fill in the book details")
