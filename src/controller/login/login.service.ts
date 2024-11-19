import { Injectable } from '@nestjs/common';
import { LoginDto } from './login-dto/login';
import { connectToDatabase } from './database/conection';
import * as sql from 'mssql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private jwtService: JwtService) { }



    async login(loginDto: LoginDto) {
        const pool = await connectToDatabase();
        console.log(loginDto)
        try {
            const result = await pool.request()
                .input('Email', sql.VarChar(100), loginDto.email)
                .input('Password', sql.VarChar(100), loginDto.password)
                .execute('sp_UserLogin');

            const user = result.recordset[0];
            console.log(user)
            const payload = { email: user.correo, sub: user.id };
            const token = this.jwtService.sign(payload);

            return {
                status: true,
                value: {
                    token,
                    user
                },
                msgError: ''
            }
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

}
