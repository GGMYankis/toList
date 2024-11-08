import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiTags } from '@nestjs/swagger';
import { TeamDto } from './team-dto/team';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) { }

    @Get()
    List() {
        return this.teamsService.list();
    }

    @Post()
    Register(@Body() teamDto: TeamDto) {
        return this.teamsService.register(teamDto);

    }
}
