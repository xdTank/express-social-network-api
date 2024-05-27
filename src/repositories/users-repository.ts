import { usersCollection } from "../db"

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

export const usersRepository = {
    async findUsers(name: string): Promise<User[]> {
        let filter: any = {}

        if (name) {
            filter.name = { $regex: name }
        }

        return usersCollection.find(filter).toArray()
    },
    async createUser(user: User): Promise<User> {

        await usersCollection.insertOne(user)
        return user
    },
    async deleteUser(id: number): Promise<void> {
        _users.filter(item => item.id !== id)
        const result = await usersCollection.deleteOne({ id })
        if (result.deletedCount === 0) {
            throw new Error('User not found')
        }
    },
    async updateUser(id: number, name: string): Promise<User | null> {
        const result = await usersCollection.updateOne({ id }, { $set: { name } })
        return result.matchedCount === 1 ? { id, name } : null
    },
    async getUserById(id: number): Promise<User | null> {
        const foundUsers = await usersCollection.findOne({ id })
        return foundUsers
    },
    async checkCreadentials(loginOrEmail: string, password: string): Promise<User | null | undefined> {
        return _users.find(user => user.name === loginOrEmail && user.name === password)
    }
}