const data=require("./data");

const sharedata=data.sharemessage;
const commentdata = data.comment;
const dbConnection = require("./config/mongoConnection");
const redis = require("redis");
const redisConnection = require("./redis/redis-connection");
const nrpSender = require("./redis/nrp-sender-shim")
/*dbConnection().then((db)=>{
    return db.dropDatabase()
})*/
//comment
redisConnection.on('comment-post:request:*', async (message, channel)=>{
    
    let info = message.data.message;
    await commentdata.addComment(info.userId, info.movieId, info.username, info.content, info.rating, info.date).then(async (newadd)=>{
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
redisConnection.on('comment-getUserId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByUserId(id).then(async (commentInfo)=>{
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
redisConnection.on('comment-getMovieId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByMovieId(id).then(async (commentInfo)=>{
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

redisConnection.on('comment-getDbId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.getCommentsByDbId(id).then(async (commentInfo)=>{
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

redisConnection.on('comment-put:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let info = message.data.message
    await commentdata.updateComment(info._id, info.content, info.rating, info.date).then(async (commentInfo)=>{
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
redisConnection.on('comment-delete:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await commentdata.removeComment(id).then(async (commentInfo)=>{
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

redisConnection.on('sharemessage-post:request:*', async (message, channel)=>{
    
    let info = message.data.message;
    await sharedata.addMessage(info.senderId, info.receiverId, info.movieId, info.message).then(async (newadd)=>{
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
redisConnection.on('sharemessage-getsenderId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.getMessagesBySenderId(id).then(async (shareInfo)=>{
        let response = await nrpSender.sendMessage({
            
            redis: redisConnection,
            eventName: "getsenderId-from-back-share",
            data: {
                
                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});
redisConnection.on('sharemessage-getreceiverId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.getMessagesByReceiverId(id).then(async (shareInfo)=>{
        let response = await nrpSender.sendMessage({
            
            redis: redisConnection,
            eventName: "getreceiverId-from-back-share",
            data: {
                
                message: await shareInfo
            },
            expectsResponse: false
        });
    })
});

redisConnection.on('sharemessage-getDbId:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.getMessagesByDbId(id).then(async (shareInfo)=>{
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
redisConnection.on('sharemessage-delete:request:*', async (message, channel)=>{
    console.log("redis");
    console.log(message.data.message);
    let id = message.data.message
    await sharedata.removeMessage(id).then(async (shareInfo)=>{
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
