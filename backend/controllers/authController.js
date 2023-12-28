const User = require("../models/User");

module.exports.signup_post = async (req, res) =>{
    const {name, email, password} = req.body;
    
    try{
        const new_user = await User.create({name, email, password})
        res.status(201).json(new_user);
        
    }catch(error){
        console.log(error)
    }
}
module.exports.login_post = (req, res) =>{
    res.send('logged in')
}

// https://www.youtube.com/watch?v=nukNITdis9g&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=5