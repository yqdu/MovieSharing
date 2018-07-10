# MovieSharing

## Introduction

This is a movie sharing website, allowing users to post movies they like, post screenshots, make comments, rate movies with score and share movies to other users. The user can also mark a movie as watched, or wishing to watch.

The website provide top 10 rated movie dislpay. Also, users can view movies by category, or simply search keywords they want. Any information of a movie can be searched as keyword, such as movie name, release year, or director.

## Core Features

User signup and login

Post movies on the website

Make comments and rating

Mark a movie watched, or wishing

See top rated movies

Search in all movie using keyword(s)

View movies by category

Search movies in a specified category

Share movies to other users(with a share message)

etc.

## How to run

### Environment

You need to have [MongoDB](https://www.mongodb.com), [Elasticsearch](https://www.elastic.co/products/elasticsearch), [ImageMagick](https://www.imagemagick.org/script/index.php) and [Redis](https://redis.io/) installed.

Install node modules, and run the services needed(MongoDB, Elasticsearch and Redis) before going next step.

### Start the website

#### Data Worker

Under ./Worker

```bash
node worker.js
```

#### API Server

Under ./APIServer

```bash
node app.js
```

#### Front End Server

Under ./FrontEnd

```bash
npm start
```

#### To seed some initial data

Under ./Worker

```bash
node seed.js
```

#### Database dump

A MongoDb dump is under the ./Worker/dump/movie-sharing

A Elasticsearch dump is under the ./Worker/dump/elasticsearch-dump

## About the front end

We recorded a video to introduce the front end technology, and showing a running demo to introduce the website.

## About the back end

### Data worker

We use [MongoDB](https://www.mongodb.com) as our main database. A data module is constructed to realize MongoDB CRUD operations. A worker is constructed to wait for CRUD requests from the API server, and do works using the data module, then return responses. These requests and responses are sent over the [Redis](https://redis.io/) pub/sub setup.

### API server

An API server is constructed to provide the RESTful APIs for the front end. The API server accepts the requests from the front end, and send a meesage to the worker. After the worker returns the message, the API server then will send a response back to the front end.

### Elasticsearch

[Elasticsearch](https://www.elastic.co/products/elasticsearch) is a powerful search and analytics engine. We apply Elasticsearch to provide advanced search options on search in movies.

When a movie is created, or updated in the main database, a copy will be persisted in the Elasticsearch. Search methods will be called from data module when executing advanced search, and return information to the data module. The final search result will then be assembled in the data module and returned to upper layer.

### ImageMagick

We use [ImageMagick](https://www.imagemagick.org/script/index.php) to process the pictures uploaded by users. The pictures will be converted into a proper format and saved. 