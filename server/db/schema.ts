import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: 'string', unique: true, required: true},
    password: {type: 'string', required: true}
})

const userModel = mongoose.model("User",userSchema);

export default userModel;