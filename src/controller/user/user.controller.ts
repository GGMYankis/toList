import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user-dto/user';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('ListByTeam/:idTeam')
    ListByTeam(@Param('idTeam') idTeam: string) {
        return this.userService.listByTeam(idTeam);
    }

    @Get('ListAdmin')
    ListAdmin() {
        return this.userService.listAdmin();
    }

    @Post()
    Register(@Body() taskDto: UserDto) {
        return this.userService.register(taskDto);
    }

    @Put()
    Edit(@Body() taskDto: UserDto) {
        return this.userService.Edit(taskDto);
    }
}
