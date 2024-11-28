import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import TokenService from "../services/token-service.js";

class UserService {
    async registration(username, password, role){
        const candidate = await UserModel.findOne({username: username})
        if(candidate){
            throw ApiError.BadRequest(`User with username ${username} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)

        const user = await UserModel.create({
            username: username,
            password: hashPassword,
            role: role
        })

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login (username, password) {
        const user = await UserModel.findOne({username: username});
        if(!user) {
            throw ApiError.BadRequest(`User with this username was not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers () {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService();
