const bcrypt = require('bcrypt');
const saltRounds = 10;
const gensalt = bcrypt.genSaltSync(saltRounds); 
const jwt = require('jsonwebtoken'); 
const db = require('../middleware/dbConnection');


exports.loginUser = async (req,res) =>{
    const {email,password} = req.body;
    const cekEmail = "SELECT * FROM tb_user WHERE email=?";

    db.query(cekEmail,[email],(err,result) =>{
      if(err) throw err;
      if(result.length === 0){
        return res.status(400).json({
          msg:"Email not found"});
      }
      const cekPassword = bcrypt.compareSync(password,result[0].password);
      if(!cekPassword){
        return res.status(400).json({
          msg:"Password not match"});
      }
      const token = jwt.sign({
        id: result[0].id, 
        email: result[0].email},'secret', { expiresIn: '1d' });

      return res.status(200).json({
        msg:"Login success",
        token
        
      });
    })
}

exports.profile = async (req, res) => {
    return res.status(200).json({
      user:req.user
    });
  }