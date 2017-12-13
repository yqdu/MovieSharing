const express = require('express');
const router = express.Router();
const redis = require("redis");
const redisConnection = require("../redis/redis-connection");
const nrpSender = require("../redis/nrp-sender-shim")
router.post("/",async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-post",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("post-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
})
router.get("/getuserId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-getUserId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getuserId-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.get("/getmovieId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-getMovieId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("getmovieId-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
router.get("/getDbId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-getDbId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("getDbId-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.put("/", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-put",
        data: {
            
            message: req.body
        },
        expectsResponse: false
    });
    
    redisConnection.on("put-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
router.delete("/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "comment-delete",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("delete-from-back:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
module.exports=router;