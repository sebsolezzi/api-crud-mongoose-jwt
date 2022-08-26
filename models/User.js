import mongoose from "mongoose";
const { Schema } = mongoose;

const schemaUser = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('users', schemaUser);
export default User;

