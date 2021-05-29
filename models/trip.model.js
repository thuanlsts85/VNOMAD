const mongoose = require('mongoose')


const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    city:{
        type: Object,
        required: true
    },
    place:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
        }
    ],
    email:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: false
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    }
},{
    timestamps: true
})


module.exports = mongoose.model("Trip", tripSchema)

