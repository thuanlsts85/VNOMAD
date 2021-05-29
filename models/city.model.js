const mongoose = require('mongoose')


const citySchema = new mongoose.Schema({
    city_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("City", citySchema)