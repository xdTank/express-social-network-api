import { Router } from "express";
import { usersService } from "../domein/users-service";
import { jwtService } from "../application/jwt-service";

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const user = await usersService.checkCreadentials(req.body.loginOrEmail, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.json({ token })
    } else {
        res.sendStatus(401)
    }

})
