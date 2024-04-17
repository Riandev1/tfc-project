import { Request, Router, Response } from 'express';
import ControllerRegister from '../controller/ControllerRegister';
import Validations from '../middlewares/validationLogin';

const controllerRegister = new ControllerRegister();

const RouteAllLogin = Router();

RouteAllLogin.post(
  '/',
  Validations.validateBook,
  (req: Request, res: Response) => controllerRegister.validation(req, res),
);
RouteAllLogin.get('/role', (req: Request, res: Response) => controllerRegister.role(req, res));

export default RouteAllLogin;
