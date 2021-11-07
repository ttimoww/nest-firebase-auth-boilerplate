import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly userService: UserService
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
         
        // Check if Bearer token is valid
        const { uid } = await this.authService.validateUserSession(authToken);
 
        // Get the User from Firestore DB
        const user = await this.userService.getUser(uid);
        request.user = user;

        if (!requiredRoles.includes(user.role.toString())) throw new UnauthorizedException();

        return !!user;
    }
}
