const generateMysqlDump = require('./lib/mysqlDump');
const uploadFileOnGoogleDrive = require('./lib/googleDrive');

/**
 * Creates a MySQL database dump and uploads it to Google Drive.
 * 
 * @param {string} filename - The name of the file to upload.
 * @param {string} privateKeyPath - The path to the private key JSON file.
 * @param {Object} dbConfig - The database configuration.
 * @param {Object} googleDriveConfig - The Google Drive configuration.
 * @returns {Promise<void>}
 */
async function createAndUploadBackup(filename, privateKeyPath, dbConfig, googleDriveConfig) {
    // Generate MySQL dump
    generateMysqlDump(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database, filename);

    // Upload file to Google Drive
    await uploadFileOnGoogleDrive(privateKeyPath, filename, googleDriveConfig.parentId, googleDriveConfig.deleteAfterUpload);
}

module.exports = createAndUploadBackup;
