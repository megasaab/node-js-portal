import {TokenService} from "../service/token-service";

const tokenService = new TokenService();

export function middlewareAuth (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw new Error('authHeader error')
        }

        const accessToken = authHeader.split(' ')[1];

        if(!accessToken) {
            throw new Error(' accessToken not found')
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if(!userData) {
            throw new Error(`user data not found userData`)
        }

        req.user = userData;
        next();
    } catch (e) {
        throw new Error('auth error')
    }
}
