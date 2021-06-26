import { userModel } from "../models/user-model";
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { MailService } from "./mail-service";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";


const mailService = new MailService();
const tokenService = new TokenService();

export class UserService {
    async registration(email,password) {
        const candidate = await userModel.findOne({email}) 
        if (candidate) {
            throw new Error(`User with ${email} already exist`);
        };

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await userModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}