const express = require("express");
const books_route= require('./routes/PdfsRoute');
const connectDB = require('./conn')
const cors= require('cors')
require('dotenv').config()


const app = express();



app.get('/', (req, res)=>{
    res.send('Server up')
})


// middleware or to set route
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/api/pdf/', books_route);




app.get('*', (req, res)=>{
    res.status(404).send('Page not found')
})


const PORT = process.env.PORT || 8000;
const start= async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
          console.log(`listing to http://localhost:${PORT} `);
        });
        
    }catch(err){
        console.log(err);
    }

}

start();