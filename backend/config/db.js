const mongoose = require('mongoose');
const CFG = require('./cfg');

const connectToMongo = async () => {
    try {
        await mongoose.connect(CFG.MONGODB_URI);
        console.log("MongoDB connected");
    } catch(e) {
        console.log(e.message);
        throw Error("Can't connect to MongoDB.");
    }
};

module.exports = connectToMongo