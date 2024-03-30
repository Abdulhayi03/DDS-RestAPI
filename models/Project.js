const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    thumb:{
        type: [String]
    },
    photos: [{
        key: String, // Assuming 'key' contains the S3 object key
        // Add other metadata fields as needed
    }],
    video:{
        type: String,
    },
    modLink:{
        type: String,
    },
    
}, {timestamps:true})

module.exports = mongoose.model('Project', ProjectSchema)