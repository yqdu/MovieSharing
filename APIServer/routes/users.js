const express = require('express');
const router = express.Router();
const redis = require("redis");
const redisConnection = require("../redis/redis-connection");
const nrpSender = require("../redis/nrp-sender-shim")
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"

router.get("/getAllUser", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-getAllUser",
        data: {
            
            message: "all users"
        },
        expectsResponse: false
    });
    redisConnection.on("getAllUser-from-back-user:request:*", (message, channel)=>{
        res.json(message.data.message);
    })
    
});
router.get("/getUserByDbId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-getUserByDbId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getUserByDbId-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.get("/getUserByEmail/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-getUserByEmail",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getUserByEmail-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.get("/getUserByUsername/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-getUserByUsername",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getUserByUsername-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});

router.put("/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-put",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("put-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.delete("/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-delete",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("delete-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.post('/authenticate', (req, res, next)=>{
    let token = req.body.token;
    return jwt.verify(token, jwtSecret, (err, decoded)=>{
        if(err) {res.status(401).json({message: "error"})}
        res.status(200).json({message: "valid token"});
    })
});

//login
router.post('/login', (req, res, next) => {

    console.log(req.body)

    return passport.authenticate('login', (err, success, data) => {
        
        if (!success) {
            return res.status(400).json({
                success: false,
                message: 'Could not process the form'
            });
        }
        else {
            console.log(data.token, "++++++++++", data.user)
            return res.status(200).json({
                success: true,
                message: 'login succeed!',
                token: data.token,
                user: data.user
            });
        }
    })(req, res, next);
});
//sign up
router.post('/signup', async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "user-post",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("post-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.post('/watchedList', async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "watchedList-post",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("watchedList-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.post('/wishList/:id', async (req, res) => {
    
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "wishList-post",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("wishList-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.delete('/wishList/:id', async (req, res) => {
    let info = req.body
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "wishList-delete",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("wishListDelete-from-back-user:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
module.exports=router;