import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) { }

  findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username }, select: ['id', 'username', 'email', 'password'] });
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepo.findOne({ where: { id } });
  }

  async findByUsernameOrEmail(username: string, email: string) {
    return this.usersRepo.findOne({
      where: [
        { username },
        { email }
      ],
    });
  }


  async create(data: Partial<User>) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }
}
