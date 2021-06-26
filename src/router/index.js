import express from 'express';
import { UserController } from '../controller/user-controller';

const userController = new UserController();
export const router = new express.Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activateLink);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
