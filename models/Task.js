import mongoose from "mongoose";
const { Schema } = mongoose;

const schemaTask = new Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.ObjectId,
        ref: "users"
    }

});

const Task = mongoose.model('task', schemaTask);
export default Task;