import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repository/user.repository';
import { User } from './entiti/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  private readonly INVALID_CREDENTIALS_MESSAGE = 'Invalid username or password';

  async validateUser(
    username: string,
    password: string,
  ): Promise<string | null> {
    try {
      const user = await this.userRepo.findByUsername(username);
      if (!user) {
        throw new UnauthorizedException(this.INVALID_CREDENTIALS_MESSAGE);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(this.INVALID_CREDENTIALS_MESSAGE);
      }

      const payload = { id: user.id, username: user.username };
      return this.jwtService.sign(payload);
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException('Authentication failed');
    }
  }

  async signup(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.userRepo.findByUsername(username);
      if (existingUser) {
        throw new BadRequestException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepo.createUser(username, hashedPassword);

      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      // Handle cases where the error is not an Error object
      throw new BadRequestException('Signup failed');
    }
  }
}
