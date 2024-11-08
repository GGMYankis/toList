import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login-dto/login';

@ApiTags('login')
@Controller('login')
export class LoginController {

    constructor(private readonly loginService: LoginService) { }

    @Get('listUsers')
    List() {
        return this.loginService.list();
    }

    @Post()
    Login(@Body() loginDto: LoginDto) {
        return this.loginService.login(loginDto);
    }

}
