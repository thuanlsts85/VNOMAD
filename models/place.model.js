const mongoose = require('mongoose')


const placeSchema = new mongoose.Schema({
    place_id:{
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
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
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
    category:{
        type: String,
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
    },
    URLs:{
        type: String,
        required: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Place", placeSchema)