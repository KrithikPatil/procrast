import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    displayName: String,
    email:String,
    password:String,
    
},{timestamps:true})

const Userdb = new mongoose.model("users",userSchema);
export default Userdb;