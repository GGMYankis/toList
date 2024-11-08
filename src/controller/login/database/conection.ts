import * as sql from 'mssql';


export const sqlConfig: sql.config = {
    user: 'sa', // Usuario de tu base de datos
    password: 'developer12x#', // Contraseña de tu base de datos
    database: 'taskMaster',
    server: 'DEVELOPER', // Cambia esto si no estás en un servidor local
    options: {
        encrypt: false, // Si no usas conexiones seguras (TLS/SSL), deja esto en false
        trustServerCertificate: true,
        enableArithAbort: false
    },
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 300000,
    },
};

export async function connectToDatabase() {
    try {
        return await sql.connect(sqlConfig);
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}
