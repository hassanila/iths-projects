

import { Request, Response, NextFunction } from 'express';

export const handleGlobalErrors = (e: any, req: Request, res: Response, next: NextFunction) => {
    if (e === '400') {
        res.status(400).json({
            message: 'Bad Request',
        });
    }
    else if (e === '401') {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
    else if (e === '403') {
        res.status(403).json({
            message: 'Forbidden',
        });
    } else if (e === '404') {
        res.status(404).json({
            message: 'Not Found',
        });
    } else {
        res.status(500).json({
            errorCode: e.code,
            message: e.message,
        });
    }
};
