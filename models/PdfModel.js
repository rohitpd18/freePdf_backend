const mongoose = require('mongoose')

const pdfSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    pdfUrl:{
        type: String
    },
    noOfPage:{
        type: Number
    },
    pdfSize:{
        type: String
    },
    img:{
        type: String
    },
    tag:{
        type: String
    },
    category:{
        type: String
    },
    publishDate:{
        type: String
    },
    uploadedBy:{
        type: String
    },
    subtitle:{
        type: String
    },
    description:{
        type: String
    },

})


module.exports= mongoose.model('Pdf', pdfSchema)