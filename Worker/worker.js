const data = require("./data");

const sharedata = data.sharemessages;
const commentdata = data.comments;
const moviedata = data.movies;
const userdata = data.users;
const dbConnection = require("./config/mongoConnection");
const redis = require("redis");
const redisConnection = require("./redis/redis-connection");
const nrpSender = require("./redis/nrp-sender-shim")
const client = require("./config/elasticsearch");
/*
dbConnection().then((db) => {
    return db.dropDatabase()
})
client.deleteByQuery({
    index: 'moviesharing',
    type: 'movie',
    body: {
        query: {
            match_all: {}
        }
      }
  }, function (error, response) {
    console.log("ES deleted!")
  });
 */
//comment

console.log("Worker started! Ready to process data!")

redisConnection.on('comment-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await commentdata.addComment(info.userId, info.movieId, info.username, info.content, info.rating, info.date).then(async (newadd) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "post-from-back",
            data: {

                message: await newadd
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('comment-getUserId:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByUserId(id).then(async (commentInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getuserId-from-back",
            data: {

                message: await commentInfo
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('comment-getMovieId:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByMovieId(id).then(async (commentInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getmovieId-from-back",
            data: {

                message: await commentInfo
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('comment-getDbId:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByDbId(id).then(async (commentInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getDbId-from-back",
            data: {

                message: await commentInfo
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('comment-put:request:*', async (message, channel) => {
    console.log("redis-put");

    let id = message.data.id;
    let info = message.data.message;
    await commentdata.updateComment(id, info.content, info.rating, info.date).then(async (commentInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "put-from-back",
            data: {

                message: await commentInfo
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('comment-delete:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.removeComment(id).then(async (commentInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "delete-from-back",
            data: {

                message: await commentInfo
            },
            expectsResponse: false
        });
    })
});
//sharemessage

redisConnection.on('sharemessage-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await sharedata.addMessage(info.senderName, info.receiverName, info.movieName, info.message).then(async (newadd) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "post-from-back-share",
            data: {

                message: await newadd
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('sharemessage-getsenderName:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let name = message.data.message
    await sharedata.getMessagesBySenderName(name).then(async (shareInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getsenderName-from-back-share",
            data: {

                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('sharemessage-getreceiverName:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let name = message.data.message
    await sharedata.getMessagesByReceiverName(name).then(async (shareInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getreceiverName-from-back-share",
            data: {

                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('sharemessage-getDbId:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.getMessagesByDbId(id).then(async (shareInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getDbId-from-back-share",
            data: {

                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});
/* not sure if need update sharemessage
redisConnection.on('sharemessage-put:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let info = message.data.message
    await commentdata.updateMessages(info._id, info.content, info.rating, info.date).then(async (shareInfo)=>{
        let response = await nrpSender.sendMessage({
            
            redis: redisConnection,
            eventName: "put-from-back-share",
            data: {
                
                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});*/
redisConnection.on('sharemessage-delete:request:*', async (message, channel) => {
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.removeMessage(id).then(async (shareInfo) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "delete-from-back-share",
            data: {

                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});

//movie
redisConnection.on('movie-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.addMovie(info).then(async (newadd) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "post-from-back-movie",
            data: {

                message: await newadd
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-getAllMovie:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.getAllMovies().then(async (allMovies) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getAllMovie-from-back-movie",
            data: {

                message: await allMovies
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-getTopTen:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.getTopTen().then(async (TopTen) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getTopTen-from-back-movie",
            data: {

                message: await TopTen
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-getMovieById:request:*', async (message, channel) => {

    let id = message.data.message;
    await moviedata.getMovieById(id).then(async (movie) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getMovieById-from-back-movie",
            data: {

                message: await movie
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-getMovieByName:request:*', async (message, channel) => {
    
        let name = message.data.message;
        await moviedata.getMovieByMovieName(name).then(async (movie) => {
            let response = await nrpSender.sendMessage({
    
                redis: redisConnection,
                eventName: "getMovieByName-from-back-movie",
                data: {
    
                    message: await movie
                },
                expectsResponse: false
            });
        })
    });

redisConnection.on('movie-put:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.updateMovieInfo(info).then(async (update) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "put-from-back-movie",
            data: {

                message: await update
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-getbyidlist:request:*', async (message, channel) => {

        let ids = message.data.message
        // console.log(ids)
        await moviedata.getMoviesByIdList(ids).then(async (search) => {
            let response = await nrpSender.sendMessage({
    
                redis: redisConnection,
                eventName: "getbyidlist-from-back-movie",
                data: {
    
                    message: await search
                },
                expectsResponse: false
            });
        })
    });

redisConnection.on('movie-searchKeyword:request:*', async (message, channel) => {

    let keyword = message.data.message;
    await moviedata.searchInMovie(keyword).then(async (search) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "searchKeyword-from-back-movie",
            data: {

                message: await search
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-searchByCategory:request:*', async (message, channel) => {

    let category = message.data.message;
    await moviedata.searchByCategory(category).then(async (search) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "searchByCategory-from-back-movie",
            data: {

                message: await search
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-searchInCategory:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.searchInCategory(info.category, info.keyword).then(async (search) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "searchInCategory-from-back-movie",
            data: {

                message: await search
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('movie-postScreenshot:request:*', async (message, channel) => {

    let info = message.data.message;
    await moviedata.addScreenshotToMovie(info.movieId, info.screenshots).then(async (shot) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "postScreenshot-from-back-movie",
            data: {

                message: await shot
            },
            expectsResponse: false
        });
    })
});

//user
redisConnection.on('user-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.addUser(info).then(async (newadd) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "post-from-back-user",
            data: {

                message: await newadd
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('user-getAllUser:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.getAllUsers().then(async (users) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getAllUser-from-back-user",
            data: {

                message: await users
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('user-getUserByDbId:request:*', async (message, channel) => {

    let id = message.data.message;
    await userdata.getUserByDbId(id).then(async (user) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getUserByDbId-from-back-user",
            data: {

                message: await user
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('user-getUserByEmail:request:*', async (message, channel) => {

    let email = message.data.message;
    await userdata.getUserByEmail(email).then(async (user) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getUserByEmail-from-back-user",
            data: {

                message: await user
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('user-getUserByUsername:request:*', async (message, channel) => {

    let username = message.data.message;
    await userdata.getUserByUsername(username).then(async (user) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "getUserByUsername-from-back-user",
            data: {

                message: await user
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('user-put:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.updateUser(info.id, info.update).then(async (user) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "put-from-back-user",
            data: {

                message: await user
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('user-delete:request:*', async (message, channel) => {

    let id = message.data.message;
    await userdata.removeUser(id).then(async (user) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "delete-from-back-user",
            data: {

                message: await user
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('watchedList-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.addToWatchedList(info.id, info.movie).then(async (list) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "watchedList-from-back-user",
            data: {

                message: await list
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('wishList-post:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.addToWishList(info.id, info.movie).then(async (list) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "wishList-from-back-user",
            data: {

                message: await list
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('wishList-delete:request:*', async (message, channel) => {

    let info = message.data.message;
    await userdata.removeFromWishList(info.id, info.movie).then(async (list) => {
        let response = await nrpSender.sendMessage({

            redis: redisConnection,
            eventName: "wishListDelete-from-back-user",
            data: {

                message: await list
            },
            expectsResponse: false
        });
    })
});