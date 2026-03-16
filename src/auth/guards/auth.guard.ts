import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    const authHeader: string | undefined = request.headers['authorization'];

    // Esperado:
    // Authorization: Bearer TOKEN

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new UnauthorizedException('Clave secreta no configurada');
      }

      const decoded = jwt.verify(token, secret);

      // adjuntar información del token al request
      request.user = decoded;

      // agregar expiración
      request.tokenExp = (decoded as any).exp;

      return true;

    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }



  }
}