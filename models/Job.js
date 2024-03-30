const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    desc:{
        type: String,
        require: true,
    },
    skills:{
        type: [String],
    },
    type:{
        type: String,
    },
}, {timestamps:true})
 
//example
// [
//     {number:101, unavailableDates:[01.02.2022, 02, 05, 2022]},
//     {number:102, unavailableDates:[03.04.2022, 02, 07, 2022]},
//     {number:103, unavailableDates:[03.01.2022, 03, 03, 2022]}
// ]

module.exports = mongoose.model('Job', JobSchema)