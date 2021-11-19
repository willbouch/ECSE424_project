import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';

@injectable()
export abstract class BaseController implements interfaces.Controller {}