import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/oauth/token') {
      // Se a solicitação for para /oauth/token, não faça a verificação JWT
      next();
      return;
    }

    const token = req.headers.authorization; // Assumindo que o token está no cabeçalho
    if (token) {
      try {
        const replaceBearerToken = token.replace('Bearer', '').trim();
        const decoded = jwt.verify(replaceBearerToken, 'ZGV2QG5wajIz'); // Substitua 'secret' pelo segredo real
        req.user = decoded; // Armazena as informações do usuário no objeto de solicitação

      } catch (error) {
        // Tratar erros de validação do token, se necessário
        res.status(401).json({ message: 'Token inválido' });
        return;
      }
    } else {
      // Tratar o caso em que não há token presente
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }
    next();
  }
}
