import mongoose from "mongoose";

const connectionUrl = 'mongodb://127.0.0.1:27018/cuculi-backend';

const db = mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => {
    console.log('Database connected');
}).catch(err => {
    console.log(`Mongodb connection error: Please ensure MongoDB is running. ${err}`);
});

module.exports = db;





