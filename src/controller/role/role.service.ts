import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';

@Injectable()
export class RoleService {

    async list() {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .query('select * from roles');
            return {
                status: true,
                value: result.recordset,
                msgError: null
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
