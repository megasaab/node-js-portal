import { UserService } from "../service/user-service";

export class UserController {
    async registration(req,res,next) {
        try {
            const {email, password} = req.body;
            const userData = await new UserService().registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure:true})
            return res.json(userData);
            
        } catch (error) {
            console.log(error);
        }
    }
    async login(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async logout(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async activateLink(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async refresh(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }

    async getUsers(req,res,next) {
        try {
            res.json(['123']);
        } catch (error) {
            
        }
    }
}


