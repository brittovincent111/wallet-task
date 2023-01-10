const mongoose = require('mongoose')
 const mongoURL = "mongodb+srv://brittovincent111:br2287476@dressup.y5evuyx.mongodb.net/cryptowallet?retryWrites=true&w=majority"


const connectedToMongo =()=>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected to database')
    })
}

module.exports = connectedToMongo;