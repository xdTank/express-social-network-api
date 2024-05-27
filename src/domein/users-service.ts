import { usersCollection } from "../db"
import { usersRepository } from "../repositories/users-repository"

export interface User {
    id: number
    name: string
}
const _users: User[] =
    [
        {
            id: 1, name: 'John'
        },
        {
            id: 2, name: 'Jane'
        }
    ]

export const usersService = {
    async findUsers(name: string): Promise<User[]> {
        return usersRepository.findUsers(name)
    },
    async createUser(name: string): Promise<User> {
        const user = {
            id: new Date().getTime(),
            name: name
        }
        const result = await usersRepository.createUser(user)
        return result
    },
    async deleteUser(id: number): Promise<void> {
        return await usersRepository.deleteUser(id)
    },
    async updateUser(id: number, name: string): Promise<User | null> {
        return await usersRepository.updateUser(id, name)

    },
    async getUserById(id: number): Promise<User | null> {
        return usersRepository.getUserById(id)
    },
    async checkCreadentials(loginOrEmail: string, password: string): Promise<User | null | undefined> {
        return usersRepository.checkCreadentials(loginOrEmail, password)
    }
}