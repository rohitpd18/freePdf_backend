const mongoose= require('mongoose');



const connectDB=(url)=>{
    console.log("connected to mongodb")
    mongoose.set('strictQuery', true);
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports= connectDB;