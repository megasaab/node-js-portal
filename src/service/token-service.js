import jwt from 'jsonwebtoken';
import {tokenModel} from '../models/token-model';

export class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'});

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        };

        return await tokenModel.create({user: userId, refreshToken});

    }

    async removeToken(refreshToken) {
        return tokenModel.deleteOne({refreshToken});
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_SECRET)
        } catch (e) {
            return null;
        }
    }


    async findToken(refreshToken) {
        return tokenModel.findOne({refreshToken});
    }

}
