import express from 'express';
import { UserController } from '../controller/user-controller';

const userController = new UserController();
export const router = new express.Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users', userController.getUsers);
