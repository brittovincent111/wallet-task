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
    payment: {
        type : Array,
        required :true
    },
    wallet:{
        type:Number,
        default : 0
    }
   
})


const userSchemma = mongoose.model('user', UserSchema)

module.exports = userSchemma