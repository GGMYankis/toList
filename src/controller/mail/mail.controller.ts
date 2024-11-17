import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { MailDto } from './mail-dto/mail';

@ApiTags('mail')
@Controller('mail')
export class MailController {

  constructor(private readonly mailService: MailService) { }

  @Post()
  async sendConfirmation(@Body() mailDto: MailDto) {
    /*   const token = 'token-generado'; // Genera o obtiene el token aquí
      await this.mailService.sendUserConfirmation(mailDto.email);
      return { message: 'Correo de confirmación enviado' }; */

    return 'Hola'
  }

}
