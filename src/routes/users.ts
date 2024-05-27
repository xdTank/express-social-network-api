import Express, { Response, Request, Router } from "express"
import { QueryUsersModel } from "../models/QueryUsersModel"
import { UserViewModel } from "../models/UserViewModel"
import { UserParamsModel } from "../models/UsersParamsModel"
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types"
import { CreateUsersModel } from "../models/CreateUsersModel"
import { UpdateUsersModel } from "../models/UpdateUsersModel"
import { body } from "express-validator"
import { inputValidationMiddleware } from "../middlewares/input-validation"
import { usersService } from "../domein/users-service"


export const HTTP_STATUSES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

const nameValidator = body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail().isLength({ min: 2, max: 10 }).
    withMessage('Name must be between 2 and 10 characters')


export const usersRouter = () => {
    const router = Router()

    router.get('/', async (req: RequestWithQuery<QueryUsersModel>, res: Response<UserViewModel[]>) => {

        const foundUsers = await usersService.findUsers(req.query.name)
        res.json(foundUsers)
    
    })
    router.get('/:id', async (req: RequestWithParams<UserParamsModel>, res: Response<UserViewModel>) => {

        const foundUsers = await usersService.getUserById(+req.params.id)
        if (!foundUsers) {
            return res.status(HTTP_STATUSES.NOT_FOUND)
        }
        res.json({ id: foundUsers.id, name: foundUsers.name })
    })
    router.post('/', nameValidator,
        inputValidationMiddleware,
        async (req: RequestWithBody<CreateUsersModel>, res: Response) => {

            const user = await usersService.createUser(req.body.name)
            res.status(HTTP_STATUSES.CREATED).json(user)
        })
    router.delete('/:id', async (req: RequestWithParams<UserParamsModel>, res: Response<UserViewModel>) => {
        await usersService.deleteUser(+req.params.id)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    })
    router.put('/:id',
        nameValidator,
        inputValidationMiddleware,
        async (req: RequestWithParamsAndBody<UserParamsModel, UpdateUsersModel>, res: Response<UserViewModel>) => {
            body
            const foundUsers = await usersService.updateUser(+req.params.id, req.body.name)
            if (!foundUsers) {
                return res.status(HTTP_STATUSES.NOT_FOUND)
            }
            res.json(foundUsers)
        })

    return router
}