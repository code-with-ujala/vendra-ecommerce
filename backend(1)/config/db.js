// const mogoose = require('mongoose');

// const connectDB = async () =>{
//     try {
//         const conn = await mogoose.connect(process.env.MONGO_URI);
//         console.log('mongoDB connected successfully');
//     }
//     catch(error){
//         console.error('MongoDB connection failed:' , error.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connected successfully');
    }
    catch(error){
        console.error('MongoDB connection failed:' , error.message);
        process.exit(1);
    }
};

module.exports = connectDB;