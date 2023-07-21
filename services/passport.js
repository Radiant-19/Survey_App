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
},(accessToken,refreshToken,profile,done)=>{
    user.findOne({googleId :profile.id})
    .then(exitinguser=>{
        if(exitinguser){
            done(null,exitinguser);
        }
        else{
            new user(
                {
                    googleId:profile.id
                }
            ).save()
            .then(User => done(null,user));

            

        }
    });
   
}));