import { Request, Response } from 'express';

export interface Controller {
  (req: Request, res: Response): Promise<void>;
}
