var express = require('express');
var router = express.Router();
const userModel=require('../models/users');
const postModel=require('./post')
const passport = require('passport');
const upload=require('./multer');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index',{nav:false});
});

router.get('/login', function(req, res, next) {
  res.render('index',{nav:false});
  console.log("login")
});


router.get('/register', function(req, res, next) {
  res.render('register',{nav:false});
  console.log("register")
});

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err) {return next(err); }
     res.send("logout");
  });
});

router.get("/profile",async function(req,res,next){
  /*const user= await userModel
  .findOne({username:req.session.passport.user})
  .populate("posts")
  console.log("users");
  res.render("profile",{user:user});*/
   res.render("profile",{nav:true});
})

router.get("/show/posts",async function(req,res,next){
  /*const user= await userModel
  .findOne({username:req.session.passport.user})
  .populate("posts")
res.render("profile",{user:user});*/
res.render("show",{nav:true});
})

router.get("/savedpins",function(req,res,next){
  res.render("saved",{nav:true});
});

router.get("/add",async function(req,res,next){
  /*const user=await userModel.findOne({username:req.session.passport.user});
  res.render("profile",{user,nav:true});*/
  res.render("add",{nav:true});
})

router.post('/createpost',upload.single("postimage"),async function (req,res,next){
  /*const user=await userModel.findOne({username:req.session.passport.user});
  const post=await postModel.create({
  user:user._id,
  title:req.body.title,
  description:req.body.description,
  image:req.file.filename
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile") */
  res.render("add",{nav:true});
});

router.post("/fileupload",upload.single("image"),async function(req,res,next){
     /*const user= await userModel.findOne({username:req.user.username});
     user.profileImage=req.file.filename;
     await user.save();
     res.redirect("/profile");*/
     res.send("uploaded");
});

router.post('/register', function(req, res) {
    var userdata=new userModel({
      username:req.body.username,
      email:req.body.email,
      password:req.body.password
    });
    userModel.register(userdata,req.body.password).then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    })
});


router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
   failureRedirect:"/"
}),function(req,res){
});

router.post("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
 res.redirect("/");
}
module.exports = router;
