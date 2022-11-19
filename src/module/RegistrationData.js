const mongoose = require('mongoose')


const registrationDataNew = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        website:{
            type:String,
            default:"",
        },
        Bio:{
           type:String,
           default:"",
        },
        profileimg:{
            type:String,
            default:"",
        },
        followers:{
            type:Array
        },
        following:{
            type:Array
        }    
})



const RegistionDataNew = mongoose.model("RegistarionDataNew",registrationDataNew)

module.exports = RegistionDataNew;

