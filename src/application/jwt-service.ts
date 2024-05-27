import { User } from "../repositories/users-repository";
import jwt from 'jsonwebtoken'

export const jwtService = {
    async createJWT(user: User) {
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' })
        return token
    },
    async verifyJWT(token: string) {
        try {
            const result = jwt.verify(token, 'secret')
            return result
        } catch {
            return null
        }

    }
}