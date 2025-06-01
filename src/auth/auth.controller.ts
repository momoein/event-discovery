import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto, LoginDto, RegisterDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      const user = await this.authService.register(body.username, body.email, body.password);
      return this.authService.login(user);
    } catch (err) {
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
