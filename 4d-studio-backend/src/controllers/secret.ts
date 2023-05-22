import { Request, Response } from 'express';
import { randomValue } from '../utils/randomValue';

const getSecret = async(req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            data: {
                secret: randomValue(128)
            }
        })        
    } catch(error: any) {
        return res.status(500).send("Internal Server Error!");
    }
}

export {
    getSecret
}