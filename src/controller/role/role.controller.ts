import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get('')
    List() {
        return this.roleService.list();
    }
}
