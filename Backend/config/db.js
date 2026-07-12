const mongoose = require("mongoose");
const connectDB = async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URI,{
        
        });
        console.log("Mongodb connected sucessfully");
    }
    catch(error){
        console.error('Mongo connection Failed:',error.message);
        process.exit(1)
    }
};
module.exports = connectDB;
