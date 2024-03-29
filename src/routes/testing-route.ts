import {Router, Request, Response} from 'express';
import {StatusCode} from "../models/common";
import {blogsCollection, postsCollection, usersCollection} from "../db/db";

export const testingRoute = Router({})

testingRoute.delete('/all-data', async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({});
    await postsCollection.deleteMany({});
    await usersCollection.deleteMany({});
    //await database.dropDatabase();
    res.sendStatus(StatusCode.NoContent_204);


});