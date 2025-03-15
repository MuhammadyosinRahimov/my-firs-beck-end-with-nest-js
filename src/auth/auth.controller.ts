import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: AuthPayloadDto, // Указываем DTO, которое описывает тело запроса
  })
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('inside AuthController status method');
    console.log(req.user);
  }
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto.username, signupDto.password);
  }
}
