import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthService {

    async validateUserSession(idToken: string): Promise<DecodedIdToken> {
        const firebaseUser = await admin.auth().verifyIdToken(idToken);      
        if (!firebaseUser) throw new UnauthorizedException();
        return firebaseUser;
    }
}
