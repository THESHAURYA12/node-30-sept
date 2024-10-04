const bcrypt = require('bcrypt')
const cloudinary = require("cloudinary").v2;
const User = require('../models/User');
const saltRounds = 10;

async function signUp(req, res) {
    try {
        console.log(req.body);
        console.log("-----------------------------")
        console.log(req.file);
        cloudinary.config({
            cloud_name: "dx9yp70tv",
            api_key: "133855126328821",
            api_secret: "u4dGlbkFUVfuu-ldRIIj1otpHhk"
        });
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result, 'result...')
        let password = bcrypt.hashSync(req.body.password, saltRounds);
        let user = new User(req.body);
        user.password = password;
        user.profileImage = result.secure_url;
        await user.save();
        res.redirect('/')
    } catch (err) {
        console.log(err.message, 'msg')
    }
}

async function dologin(req, res) {
    try {
        console.log(req.body, 'req.body')
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.end("<h1>No Such User Exist</h1>");
        } else {
            let isMatch = await bcrypt.compare(req.body.password, user.password)
            console.log(isMatch, 'isMatch')
            if (isMatch) {
                res.end("<h1>Login Is Succefull</h1>");
            } else {
                res.end("<h1>Incorrect Password</h1>")
            }
        }
    } catch (err) {
        console.log(err)
    }
}

async function getUsers(req, res){
    try{
        let users = await User.find({});
        console.log(users);
        res.render('userlist',{
            users: users
        })
    } catch(err){
        console.log(err.message);
    }
}
module.exports = {
    signUp,
    dologin,
    getUsers
}