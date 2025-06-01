import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    username: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;

    @ApiProperty({ example: 'Password123!', description: 'User password' })
    password: string;
}

export class LoginDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    username: string;

    @ApiProperty({ example: 'Password123!', description: 'User password' })
    password: string;
}

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
    accessToken: string;
}