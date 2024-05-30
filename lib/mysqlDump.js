const mysqldump = require('mysqldump');

/**
 * Generates a MySQL database dump.
 * 
 * @param {string} host - The database host.
 * @param {string} user - The database user.
 * @param {string} password - The database password.
 * @param {string} database_name - The name of the database.
 * @param {string} filename - The filename for the dump.
 */
function generateMysqlDump(host, user, password, database_name, filename) {
    mysqldump({
        connection: {
            host: host,
            user: user,
            password: password,
            database: database_name
        },
        dumpToFile: filename,
    });
}

module.exports = generateMysqlDump;
