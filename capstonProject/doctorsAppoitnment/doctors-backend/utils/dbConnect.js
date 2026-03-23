import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default dbConnect;
