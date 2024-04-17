import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

class AuthMiddleware {
  static token(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }

    const [, token] = authorization.split(' ');
    const secret = process.env.JWT_SECRET ?? 'secret';

    jwt.verify(token, secret, (error, claims) => {
      if (error) {
        res.status(401).json({ message: 'Token must be a valid token' });
        return;
      }
      res.locals.user = claims;
      next();
    });
  }
}

export default AuthMiddleware;
