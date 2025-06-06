import mongoose from "mongoose";

// function to connect to the mongoose db   
const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Database connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB