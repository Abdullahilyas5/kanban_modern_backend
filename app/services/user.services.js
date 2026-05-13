
import UserRepository from "../repository/user.repository.js";
import {API_STATUS_CODES , RESPONSE_MESSAGES} from "../../constant/AppErrors.js";
import bcrypt from "bcrypt";
import AppError from "../../constant/AppErrors.js";

class UserService {


    async register({name , email , password}){


        const existingUser = await UserRepository.findByEmail({ email });

        if(existingUser){
            throw new AppError(RESPONSE_MESSAGES.USER_ALREADY_EXISTS , API_STATUS_CODES.BAD_REQUEST);
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await UserRepository.createUser({name , email , password: hashedpassword});

        if(!user){
            throw new AppError(RESPONSE_MESSAGES.USER_CREATION_FAILED , API_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        return user;
    }


    async login({ email, password }) {

        const existingUser = await UserRepository.findByEmail({ email });
        if (!existingUser) {
            throw new AppError(RESPONSE_MESSAGES.INVALID_EMAIL_OR_PASSWORD, API_STATUS_CODES.UNAUTHORIZED);
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            throw new AppError(RESPONSE_MESSAGES.INVALID_EMAIL_OR_PASSWORD, API_STATUS_CODES.UNAUTHORIZED);
        }

        const { password: _, ...safeUser } = existingUser;
        return safeUser;
    }


    async getAllUsers() {
        const users = await UserRepository.getAllUsers();
        return users.map(user => {
            const { password, ...safeUser } = user;
            return safeUser;
        }
        );
    }
}



export default new UserService();
