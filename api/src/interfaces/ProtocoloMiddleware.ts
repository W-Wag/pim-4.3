import { Request, Response, NextFunction } from 'express';

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}
