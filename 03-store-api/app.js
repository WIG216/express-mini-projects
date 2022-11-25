const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require("./middleware/error-handler")
require('express-async-errors')

//middleware
// app.use(express.static("./public"))
app.use(express.json());

//routes
app.use('/api/v1/products', productsRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.port || 3000;

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, ()=>{
            console.log(`server running at port ${port}...` );
        })
    } catch (error) {
        console.log(error)
    }
} 

start()
 