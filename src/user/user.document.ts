import { Timestamp } from '@google-cloud/firestore';
import { Role } from './role.enum';
export class UserDocument {
  static collectionName = 'users';

  uid: string;
  createdAt: Timestamp;
  role: Role
}