import passport from 'passport';
import  {usersModel}  from '../models/user.model.js'; 
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { hashPassword, comparePasswords } from '../utils.js';
import mongoose from 'mongoose';
import config from '../config.js';

passport.use('register', new LocalStrategy({ 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const user = await usersModel.findOne({ email });
        if (user) {
            return done(null, false)
        } 
        const hashedPassword = await hashPassword(password);
        const newUser = { ...req.body, password: hashedPassword };
        const newUserDB = await usersModel.create(newUser)
        done(null, newUserDB)
    }
));

passport.use('login', new LocalStrategy({ 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        if (email === config.adminName && password === config.adminPassword) {
            const user = { _id: new mongoose.Types.ObjectId('000000000000000000000001'), email, firstName: 'coder', lastName: 'house', admin: true }
            return done(null, user)
        } else {
            const user = await usersModel.findOne({ email }); 
            if (!user) {
                return done(null, false)
            } 
            const isPasswordCorrect = await comparePasswords(password, user.password);
            if (!isPasswordCorrect) {
                return done(null, false)
            }
            done(null, user)
        }
    }
));

passport.use('github', new GithubStrategy({
    clientID: 'Iv1.d975f11c5ae917f1',
    clientSecret: 'db5d8eac124fd0a09c0a76d833e1f43163b0527f',
    callbackURL: 'http://localhost:8080/users/github'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({ email: profile._json.email || profile._json.login });
    if (!user) {
        const name = profile._json.name.split(' ');
        const newUser = {
            firstName: name.slice(0, name.length - 1).join(' '),
            lastName: name.length > 1 ? name[name.length - 1] : ' ',
            email: profile._json.email || profile._json.login,
            password: ' ',
            age: -1
        };
        const userDB = await usersModel.create(newUser);
        done(null, userDB);
    } else {
        done(null, user);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id) || { _id: new mongoose.Types.ObjectId('000000000000000000000001'), email: 'adminCoder@coder.com', firstName: 'coder', lastName: 'house', admin: true };
    done(null, user)
});