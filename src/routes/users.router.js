import { Router } from 'express';
import passport from 'passport';
import {
    githubLoginPassportController,
    logoutController,
    currentUser
} from '../controllers/users.controller.js';

const router = Router();

router.get('/logout', logoutController);

// registro con passport
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/views/errorRegister',
    successRedirect: '/views/login',  
    passReqToCallback: true
}));

// login con passport
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/views/errorLogin',
    successRedirect: '/views/products',  
    passReqToCallback: true
}));

router.get('/current', currentUser)

// login con passport github
router.get('/authGithub', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github', passport.authenticate('github'), githubLoginPassportController);



export default router;