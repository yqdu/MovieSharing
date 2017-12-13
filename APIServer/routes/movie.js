const express = require('express');
const router = express.Router();
const redis = require("redis");
const redisConnection = require("../redis/redis-connection");
const nrpSender = require("../redis/nrp-sender-shim")
router.post("/",async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-post",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("post-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
})

router.get("/getAllMovie", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-getAllMovie",
        data: {
            
            message: "get all movies"
        },
        expectsResponse: false
    });
    redisConnection.on("getAllMovie-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.get("/getTopTen", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-getTopTen",
        data: {
            
            message: "Top Ten"
        },
        expectsResponse: false
    });
    redisConnection.on("getTopTen-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.get("/getMovieById/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-getMovieById",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getMovieById-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.put("/", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-put",
        data: {
            
            message: req.body
        },
        expectsResponse: false
    });
    
    redisConnection.on("put-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.get("/searchKeyword/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-searchKeyword",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("searchKeyword-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.get("/searchCategory/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-searchCategory",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("searchCategory-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.post("/screenshot",async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "movie-postScreenshot",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("postScreenshot-from-back-movie:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
})



