import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/roles.enum'; // Asegúrate de importar tu enum UserRole aquí


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    
    const request = context.switchToHttp().getRequest();
    const role_rq = request.user.role.name;
    
    if (!role_rq) {
      return false;
    }

    return roles.some((role) => {
      return role === role_rq
    })
  }
}
