
const RegistionData = require('../../module/RegistrationData')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const findrequsers=async(req,res)=>{
  try{
    console.log(req.query)
    const Result = await RegistionData.find({username:req.query.username,email:req.query.email})
    res.json({
      Result
    }) 
  }
  catch(error){
    console.log(error)
  }
}

const updteForgettedPassword = async(req,res)=>{
    try{
        if(req.body.Passward===req.body.ConfirmPassward){
            const bcryptedPassword = await bcrypt.hash(req.body.password,10)
        const Result = await RegistionData.findOneAndUpdate({username:req.body.username,email:req.body.email},
          {
            password:bcryptedPassword
          }
          )
        res.json({
          Result
        }) 
      }
    }
      catch(error){
        console.log(error)
      }
}


module.exports = {updteForgettedPassword,findrequsers}