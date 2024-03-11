import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    diplayName: String,
    email:String,
    password:String,
    
},{timestamps:true})

const Userdb = new mongoose.model("users",userSchema);
export default Userdb;