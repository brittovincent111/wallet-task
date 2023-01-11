const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
   
    username: {
        type: String,
        required: true

    },

    userId : {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    payment:[{
        senderId : {

            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user"

        },
        recieverId : {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user"

        },
        amount : {
            type : Number,
            require: true,
        },
        message :{
            type:String,
            required: true
        },date :{
            type : Date,
            required : true

        },status:{
            type:String,
            required : true
        }

    }]
    
    
    ,
    wallet:{
        type:Number,
        default : 0
    }
   
})


const userSchemma = mongoose.model('user', UserSchema)

module.exports = userSchemma