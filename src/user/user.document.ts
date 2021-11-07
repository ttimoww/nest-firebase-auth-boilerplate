import { Timestamp } from '@google-cloud/firestore';

export class UserDocument {
  static collectionName = 'users';

  uid: string;
  createdAt: Timestamp;
}