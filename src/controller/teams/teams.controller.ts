import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    @Get('teamsOfUser/:id')
    ListTeamsOfUser(@Param('id') id: string) {
        return this.teamsService.listTeamsOfUser(id);
    }
    @Post()
    Register(@Body() teamDto: TeamDto) {
        return this.teamsService.register(teamDto);

    }
}
