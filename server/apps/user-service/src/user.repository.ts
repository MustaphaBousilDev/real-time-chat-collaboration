import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  create(userData: any) {
    console.log(userData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { id: '1', ...userData };
  }

  findById(userId: string) {
    console.log(userId);
    return { id: userId, name: 'John Doe' };
  }

  update(userId: string, userData: any) {
    console.log('Updating user:', userId, userData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { id: userId, ...userData };
  }

  delete(userId: string) {
    console.log('Deleting user:', userId);
  }
}
