const RegistionDataNew = require('../../module/RegistrationData')
const {validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('dotenv')
env.config();

const Registation = async (req, res) => {
    try {
        const validationOutput = validationResult(req)
        const hashedPassowrd = await bcrypt.hash(req.body.password, 10)
        if (validationOutput.isEmpty()) {
            let Result = await RegistionDataNew.create({
                name: req.body.name,
                username: req.body.username,
                password: hashedPassowrd,
                email: req.body.email
            })
            res.json({ Result })
        } else {
            res.json({
                error: validationOutput.array()
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}

const login = async (req, res) => {
    try {
        const userdata = await RegistionDataNew.find({ username: req.body.username })
        if (userdata) {
            const PsswordOutput = await bcrypt.compare(req.body.password, userdata[0].password)
            if (PsswordOutput) {
                const token = jwt.sign({ userdata }, process.env.SECRATE_KEY)
                console.log(token)
                res.json({ token, userdata })
            }
            else {
                res.status(400).json({
                    message: "incorrect username or password"
                })
            }
        }
    }
    catch (error) {
        res.send(error)
    }
}

const patchUserData = async(req,res)=>{
    try{
        const Result = await RegistionDataNew.findByIdAndUpdate({_id:req.params.id},{
          name:req.body.name,
          username:req.body.username,
          website:req.body.website,
          Bio:req.body.Bio,
          profileimg: req.body.image
        })
        console.log(Result)
        res.json({
          Result
        }) 
      }
      catch(error){
        console.log(error)
      }
}

const getUpdatedData = async(req,res)=>{
    try{
        const Result = await RegistionDataNew.findOne({_id:req.params.id})
        res.json({
          Result
        }) 
      }
      catch(error){
        console.log(error)
      }
}

const getAllUsers = async(req,res)=>{
    try{
      const Result = await RegistionDataNew.find({name:{$regex:`${req.body.char}`}})
      res.json({
        Result
      })
       }
       catch(error){
        console.log(error)
       }
}





module.exports = { Registation,login,patchUserData,getUpdatedData,getAllUsers}