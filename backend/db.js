const mysql = require('mysql2');

// Crear una pool de conexiones (recomendado para uso en producción)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Tu usuario de MySQL
    password: 'JuanCho*99', // Tu contraseña de MySQL
    database: 'eventoCiclismo',
});

// Exportar la función de consulta
module.exports = pool.promise();
