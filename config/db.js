import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('conectado')
} catch (error) {
    console.log(error)
}
