const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
}, {timestamps:true})

//example
// [
//     {number:101, unavailableDates:[01.02.2022, 02, 05, 2022]},
//     {number:102, unavailableDates:[03.04.2022, 02, 07, 2022]},
//     {number:103, unavailableDates:[03.01.2022, 03, 03, 2022]}
// ]

module.exports = mongoose.model('Service', ServiceSchema)