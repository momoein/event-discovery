import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, email: string, password: string) {
        const existing = await this.usersService.findByUsernameOrEmail(username, email);
        if (existing) {
            throw new BadRequestException('Username or email already in use');
        }

        const hashed = await bcrypt.hash(password, 10);

        try {
            const user = await this.usersService.create({ username, email, password: hashed });
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (err) {
            if (err instanceof QueryFailedError && err.message.includes('UNIQUE')) {
                throw new BadRequestException('Username or email already exists');
            }
            throw new InternalServerErrorException('Something went wrong during registration');
        }

    }
}
