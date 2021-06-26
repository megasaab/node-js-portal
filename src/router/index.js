import express from 'express';
import { UserController } from '../controller/user-controller';
import * as expressValidator from 'express-validator';

const userController = new UserController();
export const router = new express.Router();

router.post('/registration', userController.registration, 
    expressValidator.body('email').isEmail(),
    expressValidator.body('password').isLength({min: 5, max: 25})
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activateLink);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
