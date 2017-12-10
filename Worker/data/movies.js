const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
//keep consistent in ES
//advanced searching using ../elasticsearch
const es = require("../elasticsearch");
const im = require("../imagemagick");
const uuid = require('node-uuid');

let exportedMethods = {
    getAllMovies() {
        return movies().then((movieCollection) => {
            return movieCollection.find({}).toArray();
        });
    },

    getTopTen() {
        return this.getAllMovies((movies) => {
            movies.sort((movie1, movie2) => {
                let score1 = movie1.score;
                let score2 = movie2.score;
                if (!score1) score1 = -1;
                if (!score2) score2 = -1;
                return score2 - score1;
            });
            return movies.slice(0, (movies.length < 10 ? movies.length : 10));
        });
    },

    getMovieById(id) {
        return movies().then((movieCollection) => {
            return movieCollection.findOne({ name = movie.name }).then((movie) => {
                if (!movie) {
                    throw "Movie not found!";
                }
                return movie;
            })
        });
    },

    addMovie(movie) {
        return movies().then((movieCollection) => {
            //data from front end includes name, year, directors, stars, writers, description, poster and category
            // xss process in API server
            let newMovie = {
                _id = uuid.v4(),
                name = movie.name,
                year = movie.year,
                score = undefined,
                commentNum = 0,
                watchedUsers =[],
                wishingUsers =[],
                directors = movie.directors,
                stars = movie.stars,
                writers = movie.writers,
                description = movie.description,
                screenShots =[],
                category = movie.category
            };
            newMovie.poster = im.processPoster(movie.poster, newMovie._id);
            return movieCollection.findOne({
                name = movie.name
            }).then((movie) => {
                if (book) {
                    throw "This movie already exists!";
                } else {
                    return movieCollection.insertOne(newMovie).then((insertInfo) => {
                        return insertInfo.insertedId;
                    }).then((newId) => {
                        //todo: consistent in ES
                        //only stores basic informations in ES
                        return this.getMovieById(newId).then((insertedMovie) => {
                            let id = insertedMovie._id;
                            let copy = {
                                name = insertedMovie.name,
                                year = insertedMovie.year,
                                directors = insertedMovie.directors,
                                stars = insertedMovie.stars,
                                writers = insertedMovie.writers,
                                description = insertedMovie.description,
                                category = insertedMovie.category
                            }
                            es.addMovie(id, copy);
                            return insertedMovie;
                        }).catch((e) => {
                            throw "Error inserting into ES!"
                        })
                    }).catch((e) => {
                        throw "Error inserting into MongoDB!"
                    })
                }
            })
        });
    },

    /*
    removeMovie() {

    },
    */

    // call es.addMovie to update in ES

    updateMovieInfo(updateMovie) {
        return movies().then((movieCollection) => {
            let updateInfo = {
                name = updateMovie.name,
                year = updateMovie.year,
                directors = updateMovie.directors,
                stars = updateMovie.stars,
                writers = updateMovie.writers,
                description = updateMovie.description,
                category = updateMovie.category
            }
            let updateCommand = {
                $set: updateInfo
            };
            return movieCollection.updateOne({ _id: updateMovie._id }, updateCommand).then((result) => {
                es.addMovie(updateMovie._id, updateInfo);
                return this.getMovieById(updateMovie._id);
            })
        })
    },

    // search given keyword in all movie
    searchInMovie(keyword) {
        return es.searchInMovie(keyword).then((results) => {
            let movies = [];
            results.forEach((result) => {
                movies.push(this.getMovieById(result._id));
            })
            return movies;
        })
    },

    // search for given category
    searchByCategory(category) {
        return es.searchByCategory(category).then((results) => {
            let movies = [];
            results.forEach((result) => {
                movies.push(this.getMovieById(result._id));
            })
            return movies;
        })
    },

    // search for keyword in given category
    searchInCategory(category, keyword) {
        return es.searchInCategory(category, keyword).then((results) => {
            let movies = [];
            results.forEach((result) => {
                movies.push(this.getMovieById(result._id));
            })
            return movies;
        })
    },

    addScreenshotToMovie(movieId, pictureUrl) {
        return movies().then((movieCollection) => {
            return movieCollection.updateOne({ _id: movieId }, {
                $addToSet: {
                    screenShots: pictureUrl
                }
            });
        });
    },

    updateWatchedUsers(movieId, userId) {
        return movies().then((movieCollection) => {
            return movieCollection.updateOne({ _id: movieId }, {
                $addToSet: {
                    watchedUsers: userId
                }
            });
        });
    },

    updateWishingUsers() {
        return movies().then((movieCollection) => {
            return movieCollection.updateOne({ _id: movieId }, {
                $addToSet: {
                    wishingUsers: userId
                }
            });
        });
    },

    //call it when add mew comment
    addScore(movieId, score) {
        return movies().then((movieCollection) => {
            return this.getMovieById(id).then((movie) => {
                let newScore;
                if (!movie.score || movie.commentNum === 0) {
                    newScore = score;
                } else {
                    newScore = (movie.score * movie.commentNum + score) / (movie.commentNum + 1);
                }
                let updateInfo = {
                    score: newScore,
                    commentNum: movie.commentNum + 1
                };

                let updateCommand = {
                    $set: updateInfo
                };
                return movieCollection.updateOne({ _id: movieId }, updateCommand).then((result) => {
                    return this.getMovieById(movieId);
                });
            });
        });
    },
    //call it when update comment
    updateScore(movieId, newScore, oldScore) {
        return movies().then((movieCollection) => {
            return this.getMovieById(id).then((movie) => {
                let score;
                if (!movie.score || movie.commentNum === 0) {
                    score = newScore;
                } else {
                    score = (movie.score * movie.commentNum + newScore - oldScore) / (movie.commentNum);
                }
                let updateInfo = {
                    score: newScore,
                };
                let updateCommand = {
                    $set: updateInfo
                };
                return movieCollection.updateOne({ _id: movieId }, updateCommand).then((result) => {
                    return this.getMovieById(movieId);
                });
            });
        });
    },
}

module.exports = exportedMethods;