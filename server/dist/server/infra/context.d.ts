import type { NextFunction, Request, Response } from 'express';
declare global {
    namespace Express {
        interface Request {
            context?: import('../../shared/contract').Context;
        }
        interface Response {
            context?: import('../../shared/contract').Context;
        }
    }
}
export declare function contextHandler(req: Request, res: Response, next: NextFunction): void;
