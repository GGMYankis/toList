import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './controller/login/login.module';
import { TaskMasterModule } from './controller/task-master/task-master.module';
import { TaskStatusModule } from './controller/task-status/task-status.module';
import { TeamsModule } from './controller/teams/teams.module';
import { UserModule } from './controller/user/user.module';
import { PriorityModule } from './controller/priority/priority.module';
import { MailModule } from './controller/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RoleModule } from './controller/role/role.module';
import { CommentModule } from './controller/comment/comment.module';

@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true para puerto 465, false para otros
        auth: {
          user: 'giancarlosgenao7@gmail.com',
          pass: 'kvwnbrzucoauygox',
        },
        tls: {
          rejectUnauthorized: false, // Ignora certificados no válidos
        },
      },
      defaults: {
        from: '"Giancarlos" <giancarlosgenao7@gmail.com>',
      },
    }),
    LoginModule, TaskMasterModule, TaskStatusModule, TeamsModule, UserModule, PriorityModule, MailModule, RoleModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
