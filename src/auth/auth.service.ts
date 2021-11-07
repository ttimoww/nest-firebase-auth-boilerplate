import { Injectable, UnauthorizedException } from '@nestjs/common';

// Firebase
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthService {

    /**
     * Validates the User session with Firebase Authentication
     * @param idToken Auth Bearer Token
     */
    async validateUserSession(idToken: string): Promise<DecodedIdToken> {
        const firebaseUser = await admin.auth().verifyIdToken(idToken)  
            .catch(() => {
                throw new UnauthorizedException();
            });    
        if (!firebaseUser) throw new UnauthorizedException();
        return firebaseUser;
    }
}
