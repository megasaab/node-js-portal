import { userModel } from "../models/user-model";
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { MailService } from "./mail-service";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";
import { SundryService } from "./sundry/sundry-service";
import { resumeModel } from "../models/resume-model";


const mailService = new MailService();
const tokenService = new TokenService();

export class UserService {

    async createResume(name, description, position, user) {
        const resume = await resumeModel.create({name, position, description, user});
        return resume;
    }

    async getResume(userId) {
        const resume = await resumeModel.find({user: userId})
        return resume;
    }

    async registration(email,password) {
        const candidate = await userModel.findOne({email})
        if (candidate) {
            throw new Error(`User with ${email} already exist`);
        };

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await userModel.create({email, password: hashPassword, activationLink});
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(link) {
        const user = await userModel.findOne({activationLink});
        if(!user) {
            throw new Error("inccorrect link")
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({email});
        if(!user) {
            return new SundryService().sendStatus(res, 404);
        }
        const isEqualPass = await bcrypt.compare(password, user.password);

        if(!isEqualPass) {
            return new SundryService().sendStatus(res, 401);
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }

    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('null token')
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw new Error('unauthorized error')
        }

        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}
