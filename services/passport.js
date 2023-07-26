const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys =require('../config/keys');
const mongoose = require('mongoose');
const user = mongoose.model('users');
passport.serializeUser((User,done)=>{
    done(null,User.id);

});
passport.deserializeUser((id,done)=>{
    user.findById(id)
    .then(User=>{
        done(null,User);
    })

});
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},
async (accessToken,refreshToken,profile,done)=>{
    const exitinguser =await user.findOne({googleId :profile.id})
    
        if(exitinguser){
            return done(null,exitinguser);
        }
        else{
           const  user= await new user(
                {
                    googleId:profile.id
                }
            ).save();
             done(null,user);

            

        }
    
   
}));