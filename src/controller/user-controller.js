import { SundryService } from "../service/sundry/sundry-service";
import { UserService } from "../service/user-service";

const sundryService = new SundryService();

export class UserController {
    async registration(req,res,next) {
        try {
            const {email, password} = req.body;
            const userData = await new UserService().registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure:false})
            return res.json(userData);
            
        } catch (error) {
            sundryService.sendStatus(res, 401);
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
            const link = req.params.link;
            await UserService.activateLink(link);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            sundryService.sendStatus(res, 404);
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


