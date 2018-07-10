const mongoCollections = require("../config/mongoCollections");
const sharemessages = mongoCollections.shareMessages;
const uuid = require('node-uuid');
let exportedMethods = {
    getMessagesBySenderName(senderName) {
        return sharemessages().then((sharemessagesCollection)=>{
            return sharemessagesCollection.find({senderName: senderName}).toArray();
                // if(sharemessages === null){return "sharemessages not found by SenderId"}
                // else{return sharemessages}
                
        })
    },
        
       
    getMessagesByReceiverName(receiverName) {
        return sharemessages().then((sharemessagesCollection)=>{
            return sharemessagesCollection.find({receiverName: receiverName}).toArray();
                // if(sharemessages === null){return "sharemessages not found by ReceiverId"}
                // else{return sharemessages}
                
        })
    },
        
       
    getMessagesByDbId(id) {
        
        return sharemessages().then((sharemessagesCollection)=>{
            return sharemessagesCollection.findOne({_id: id}).then(async (sharemessages)=>{
                // if(sharemessages === null){return "sharemessages not found"}
                // else{return await sharemessages}
                return sharemessages;
            })
        })
    },
       
       
    addMessage(senderName, receiverName,movieName, message) {
        return sharemessages().then((sharemessagesCollection)=>{
            let newSharemessage = {
                _id: uuid.v4(),
                senderName: senderName,
                receiverName: receiverName,
                movieName: movieName,
                message: message
            };
            return sharemessagesCollection.insertOne(newSharemessage).then((newInsert)=>{
                // console.log(newInsert.insertedId);
                return newInsert.insertedId;
                
            }).then((newId)=>{
                console.log("added a sharemessage!")
                return this.getMessagesByDbId(newId);
            })
        })
    },
        
          // useless? Don’t need this maybe
    removeMessage(id) {
        if(!id){
            return Promise.reject("Invlid id");
        }
        return sharemessages().then((sharemessagesCollection)=>{
            return sharemessagesCollection.removeOne({_id: id}).then((deleteInfo)=>{
                if(deleteInfo.deletedCount === 0){
                    throw(`Could not delete sharemessage with id of ${id}`);
                }
                return "The data has been deleted";
            })
        })
    },
       
}
module.exports = exportedMethods;