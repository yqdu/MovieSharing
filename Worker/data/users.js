const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");
const movies = require('./movies');
const im = require("../imagemagick");

let exportedMethods = {
    getAllUsers() {
        return users().then((usersCollection) => {
            return usersCollection.find({}).toArray();
        })
    },


    getUserByDbId(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                // if (!user) throw "Can not find user";
                return movies.getMoviesByIdList(user.wishList).then((wishMovies) => {
                    return movies.getMoviesByIdList(user.watchedList).then((watchedMovies) => {
                        user.watchedMovies = watchedMovies;
                        user.wishMovies = wishMovies;
                        return user;
                    })
                })
                
            })
        })
    },


    getUserByEmail(email) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                // if (!user) throw "Can not find user";
                return user;
            })
        })
    },

    getUserByUsername(username) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ username: username }).then((user) => {
                // if (!user) throw "Can not find user";
                return user;
            })
        })
    },
    // used in app.js
    // getUserByIDPassport(id, cb) {
    //     return users().then((usersCollection) => {
    //         return usersCollection.findOne({ _id: id }).then((user) => {
    //             if (!user) cb(new Error('user ' + id + 'does not exist!'));
    //             return cb(null, user);
    //         })
    //     })
    // },
    // // used in app.js
    // getUserByEmailPassport(email, cb) {
    //     return users().then((usersCollection) => {
    //         return usersCollection.findOne({ email: email }).then((user) => {
    //             if (!user) cb(new Error('user ' + id + 'does not exist!'));
    //             return cb(null, user);
    //         })
    //     })
    // },
    addUser(user) {
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid.v4(),
                username: user.username,
                email: user.email, //decodeURIComponent?
                profile: im.processProfile(user.profile, user.username),
                watchedList: [],
                wishList: [],
                saltedPassword: bcrypt.hashSync(user.password),
            }
            return usersCollection.findOne({ username: user.username }).then((u) => {
                if (u) return false;
                else {
                    return usersCollection.insertOne(newUser).then((result) => {
                        return result.insertedId;
                    }).then((newId) => {
                        console.log("added a user!")
                        return this.getUserByDbId(newId);
                    })
                }
            })
        })

    },


    removeUser(id) {
        return users().then((usersCollection) => {
            return usersCollection.deleteOne({ _id: id }).then((deleteInfo) => {
                if (deleteInfo.deletedCount === 0) {
                    return false;
                    // throw 'can not delete user with id of ${id}'
                }
                return id;
            }).catch((e) => {
                console.log("remove error", e);
            })
        })

    },

    updateUser(id, updateU) {
        // if (!id || !updateU || id === undefined || updateU === undefined) {
        //     return Promise.reject("The update information is not valid");
        // }
        return users().then((usersCollection) => {
            let updateData = {};
            // if (updateU.username) {
            //     updateData.username = updateU.username;
            // }

            // if (updateU._id) {
            //     updateData._id = updateU._id;
            // }
            if (updateU.email) {
                updateData.email = updateU.email;
            }
            if (updateU.password) {
                updateData.saltedPassword = bcrypt.hashSync(updateU.password);
            }
            // if (updateU.watchedList) {
            //     updateData.watchedList = updateU.watchedList;
            // }
            // if (updateU.wishList) {
            //     updateData.wishList = updateU.wishList;
            // }
            let updateCommand = {
                $set: updateData
            };
            return usersCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getUserByDbId(id);
            }).catch((error) => {
                console.log("update error", error);
            })

        })
    },
    //update watchedTimes in movies
    addToWatchedList(id, movieId) {
        return users().then((usersCollection) => {
            // return usersCollection.findOne({ _id: id }).then((user) => {
            //     if (!user) throw "user not found";
            //     let updateData = { watchedList: user.watchedList.push(movie) };
            //     let updateCommand = { $set: updateData }
            //     return usersCollection.updateOne({ _id: id }, updateCommand).then(() => {
            //         movies.updateWatchedUsers(movie, id);
            //         return this.getUserByDbId(id);
            //     })
            // })
            movies.updateWatchedUsers(movieId, id);
            return usersCollection.updateOne({ _id: id }, {
                $addToSet: {
                    watchedList: movieId
                }
            }).then((result) => {
                return this.getUserByDbId(id);
            });
        })
    },

    //updating wishing in movies
    addToWishList(id, movieId) {
        return users().then((usersCollection) => {
            // return usersCollection.findOne({ _id: id }).then((user) => {
            //     if (!user) throw "user not found";
            //     let updateData = { wishList: user.wishList.push(movie) };
            //     let updateCommand = { $set: updateData }
            //     return usersCollection.updateOne({ _id: id }, updateCommand).then(() => {
            //         movies.updateWishingUsers(movie, id);
            //         return this.getUserByDbId(id);
            //     })
            // })
            movies.updateWishingUsers(movieId, id);
            return usersCollection.updateOne({ _id: id }, {
                $addToSet: {
                    wishList: movieId
                }
            }).then((result) => {
                return this.getUserByDbId(id);
            });
        })
    },

    //updating wishing in movies
    removeFromWishList(id, movieId) {
        return users().then((usersCollection) => {
            // return usersCollection.findOne({ _id: id }).then((user) => {
            //     if (!user) throw 'user not found';
            //     let newWishList = [];
            //     for (let i = 0; i < user.wishList.length; i++) {
            //         if (user.wishList[i] === movie) {
            //             continue;
            //         }
            //         newWishList.push(user.wishList[i]);
            //     }
            //     let updateData = { wishList: newWishList };
            //     let updateCommand = { $set: updateData }
            //     return usersCollection.updateOne({ _id: id }, updateCommand).then(() => {
            //         movies.removeWishingUsers(movie, id);
            //         return this.getUserByDbId(id);
            //     })
            // })
            movies.removeWishingUsers(movieId, id);
            return usersCollection.updateOne({ _id: id }, {
                $pull: {
                    wishList: movieId
                }
            }).then((result) => {
                return this.getUserByDbId(id);
            });
        })
    }
}

module.exports = exportedMethods;