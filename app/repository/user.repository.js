import prisma from "../../lib/prismaClient.js";
import AppError from "../../constant/AppErrors.js";
import { API_STATUS_CODES, RESPONSE_MESSAGES } from "../../constant/AppErrors.js";


class UserRepostory {


    async createUser({ name, email, password }) {

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                },
            });

            const { password: _, ...safeUser } = user;

            return safeUser;

        } catch (error) {
            throw new AppError(RESPONSE_MESSAGES.USER_CREATION_FAILED, API_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async findByEmail({ email }) {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            return user;
        } catch (error) {
            throw new AppError("Db : Error finding user by email");
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany({
                select : {
                    name : true,
                }
            });
            return users;
        } catch (error) {
            throw new AppError(error.message, API_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new UserRepostory();