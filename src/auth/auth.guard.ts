import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (requiredRoles == undefined || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) return false;

        const authToken = authHeader.replace('Bearer ', '');
         
        const user = await this.authService.validateUserSession(authToken);

        /**
         * Todo:
         * 1. Get the User from the DB
         * 2. Check if user has the right Roles (requiredRoles)
         */
        
        return !!user;
    }
}
