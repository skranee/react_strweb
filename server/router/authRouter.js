import {Router} from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';

const router = new Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    authController.loginWithFacebook
);

router.post(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    authController.loginWithGoogle
);

router.get('/profile', authController.getProfile);

router.get('/logout', authController.logout);

export default router;
