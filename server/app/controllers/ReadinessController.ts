import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { ReadinessService } from '../services/ReadinessService';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

@controller('/readiness')
export class ReadinessController extends BaseController {
    
    constructor(@inject('ReadinessService') private readinessService: ReadinessService) {
        super();
    }

    @httpPost('/')
    public async getReadiness(req: Request, res: Response): Promise<any> {
        const response = this.readinessService.getReadiness(req.body.message, req.body.length);
        res.status(200).json(response);
    }
}