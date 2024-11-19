import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UrlSet } from 'src/probar/probar';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { MailDto } from './mail-dto/mail';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) { }

    private async crearHtmlCorreo(templateCorreo: string, mailDto: MailDto): Promise<string> {
        try {
            // Lee y compila la plantilla
            const templateSource = fs.readFileSync(`src/templates/${templateCorreo}.hbs`, 'utf-8');
            const template = Handlebars.compile(templateSource);
            // Rellena la plantilla con los datos proporcionados
            const html = template({
                nombreTarea: mailDto.taskName,
                NombreUsuario: mailDto.userName,
                descripcionTarea: mailDto.descripcion,
                fechaVencimiento: mailDto.fechaVencimiento,
                urlTarea: 'https://dazzling-sunburst-94e779.netlify.app',
            });
            return html;
        } catch (error) {
            console.error('Error al crear el HTML del correo:', error.message);
            throw error;
        }
    }


    async sendUserConfirmation(mailDto: MailDto) {
        try {

            const html = await this.crearHtmlCorreo('NewTask', mailDto);


            await this.mailerService.sendMail({
                to: mailDto.email,
                subject: 'Confirmación de cuenta',
                html: html,
            });

            return { message: 'Correo de confirmación enviado' };
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw error;
        }
    }
}
