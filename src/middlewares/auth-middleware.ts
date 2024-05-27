import { jwtService } from "../application/jwt-service"
import { usersService } from "../domein/users-service"

export const authMiddleware = async (req: any, res: any, next: any) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    const token = req.headers.authorization.split(' ')[1]
    const userData = await jwtService.verifyJWT(token)
    if (userData) {
        req.user = await usersService.getUserById(Number(userData))
        next()
    }
    res.sendStatus(401)
}