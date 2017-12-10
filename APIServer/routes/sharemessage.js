const express = require('express');
const router = express.Router();
const redis = require("redis");
const redisConnection = require("../redis/redis-connection");
const nrpSender = require("../redis/nrp-sender-shim")
router.post("/",async (req, res) => {
    let info = req.body;
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-post",
        data: {
            
            message: info
        },
        expectsResponse: false
    });
    redisConnection.on("post-from-back-share:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
})
router.get("/getsenderId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-getsenderId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    redisConnection.on("getsenderId-from-back-share:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
    
});
router.get("/getreceiverId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-getreceiverId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("getreceiverId-from-back-share:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
router.get("/getDbId/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-getDbId",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("getDbId-from-back-share:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});

router.put("/", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-put",
        data: {
            
            message: req.body
        },
        expectsResponse: false
    });
    
    redisConnection.on("put-from-back-share:request:*", (message, channel)=>{
        
        res.json(message.data.message);
    })
});
router.delete("/:id", async (req, res) => {
    let response = await nrpSender.sendMessage({
        
        redis: redisConnection,
        eventName: "sharemessage-delete",
        data: {
            
            message: req.params.id
        },
        expectsResponse: false
    });
    
    redisConnection.on("delete-from-back-share:request:*", (message, channel)=>{
        console.log(message);
        res.json(message.data.message);
    })
});
module.exports=router;