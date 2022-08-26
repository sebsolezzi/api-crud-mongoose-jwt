import mongoose from "mongoose";

try {
    mongoose.connect("mongodb+srv://sebsolezzi:789456123@cluster0.tuyi8.mongodb.net/?retryWrites=true&w=majority")
    console.log('conectado')
} catch (error) {
    console.log(error)
}
