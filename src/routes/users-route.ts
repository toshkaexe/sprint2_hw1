import {Router, Response, Request} from "express";
import {getPageOptions} from "../types/type";
import {StatusCode} from "../models/common";
import {authMiddleware} from "../middleware/auth-middlewares";
import {UsersQueryRepository} from "../repositories/user-query-repository";
import {usersService} from "../domain/users-service";
import {validateUsers} from "../validators/auth-validation";
import {inputValidation} from "../validators/input-validation";

export const usersRouter = Router({})

usersRouter.get('/',
    authMiddleware,
    async (req: Request, res: Response) => {
        const {pageNumber, pageSize, sortBy, sortDirection} = getPageOptions(req.query);
        const searchLoginTerm = req.query.searchLoginTerm ? req.query.searchLoginTerm.toString() : null
        const searchEmailTerm = req.query.searchEmailTerm ? req.query.searchEmailTerm.toString() : null


        const foundUsers = await UsersQueryRepository.findUsers(pageNumber, pageSize,
            sortBy, sortDirection, searchLoginTerm, searchEmailTerm)
        return res.send(foundUsers)
    })

usersRouter.post('/',
    authMiddleware,
    validateUsers(),
    inputValidation,

    async (req: Request, res: Response): Promise<void> => {
        const newUser = await usersService.createUser(req.body)
        res.status(StatusCode.CREATED_201).send(newUser)
    })

usersRouter.delete('/:id',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await usersService.deleteUser(req.params.id)
        isDeleted ? res.sendStatus(StatusCode.NoContent_204) :
            res.sendStatus(StatusCode.NOT_FOUND_404)
    })