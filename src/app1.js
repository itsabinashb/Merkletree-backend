const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/user.routes');
const app = express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// if(process.env.Node_ENV != 'production') {
//     dotenv.config();
// }

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use('/', router);

//start the mongoose connection
const start = async() => {
    try {
        await mongoose.connect(CONNECTION);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log('App listening on port: ' + PORT)
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();