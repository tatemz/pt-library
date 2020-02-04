package service

import (
	"context"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	col *mongo.Collection
}

// CreateDatabase creates the mongo database
func CreateDatabase(host, port, database, collection string) (Database, error) {
	ctx := context.Background()
	client, err := mongo.Connect(
		ctx,
		options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s/", host, port)),
	)

	if err != nil {
		return Database{}, errors.New("Could not connect to mongo db")
	}

	db := client.Database(database)
	col := db.Collection(collection)

	return Database{col: col}, nil
}
