const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const uuid = require('node-uuid');
const movies = require('./movies');

let exportedMethods = {
    getCommentsByUserId(id) {
        return comments().then((commentsCollection) => {
            return commentsCollection.find({ userId: id }).toArray();
            // if (comments === null) { return "comments not found for userId"; }
            // else { return comments }

        })
    },


    getCommentsByMovieId(movieId) {
        return comments().then((commentsCollection) => {
            return commentsCollection.find({ movieId: movieId }).toArray();
            // if (comments === null) { return "comments not found for movieId" }
            // else { return comments }

        })
    },


    getCommentsByDbId(id) {
        //suppose comment and movie are seperate two tables
        return comments().then((commentsCollection) => {
            return commentsCollection.findOne({ _id: id }).then((comment) => {
                // if (comments === null) { return "comments not found" }
                // else { return comments }
                return comment;
            })
        })
    },
    //update averagePoint in movies
    addComment(userId, movieId, username, content, rating, date) {
        //this.updateScore() for rate updating
        return comments().then((commentsCollection) => {
            let newComment = {
                _id: uuid.v4(),
                userId: userId,
                movieId: movieId,
                username: username,
                content: content,
                rating: rating,
                date: date
            };
            movies.addScore(movieId, rating);
            return commentsCollection.insertOne(newComment).then((newInsert) => {
                return newInsert.insertedId;
            }).then((newId) => {
                console.log("added a comment!");
                return this.getCommentsByDbId(newId);
            })
        })
    },
    // update averagePoint in movies
    removeComment(id) {
        return comments().then((commentsCollection) => {
            return this.getCommentsByDbId(id).then((originComment) => {
                return commentsCollection.removeOne({ _id: id }).then((deleteInfo) => {
                    if (deleteInfo.deletedCount === 0) {
                        return false;
                    } else {
                        movies.removeScore(originComment.movieId, originComment.rating);
                        return "The data has been deleted!";
                    }
                });
            })

        })
    },

    // update averagePoint in movies
    // support partly updating
    updateComment(id, updatedContent, updatedRating, updatedDate) {
        return comments().then((commentsCollection) => {
            let updateInfo = {
                content: updatedContent,
                rating: updatedRating,
                date: updatedDate
            }
            let updateCommand = {
                $set: updateInfo
            };
            return this.getCommentsByDbId(id).then((originComment) => {
                return commentsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    movies.updateScore(originComment.movieId, updatedRating, originComment.rating);
                    return this.getCommentsByDbId(id);
                })
            })
        })
    }
}
module.exports = exportedMethods;