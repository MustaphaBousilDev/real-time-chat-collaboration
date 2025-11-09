// apps/user-service/src/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEvents } from './kafka/user.events';

@Injectable()
export class UserService {
  getUserById(userId: string) {
    console.log(userId);
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userEvents: UserEvents,
  ) {}

  createUser(userData: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const createdUser = this.userRepository.create(userData);
    this.userEvents.emitUserCreated(createdUser);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createdUser;
  }

  updateUser(userId: string, userData: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const updatedUser = this.userRepository.update(userId, userData);
    this.userEvents.emitUserUpdated(updatedUser);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return updatedUser;
  }

  deleteUser(userId: string) {
    this.userRepository.delete(userId);
    this.userEvents.emitUserDeleted(userId);
  }
}
