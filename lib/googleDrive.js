const { google } = require('googleapis');
const fs = require('node:fs');

/**
 * Uploads a file to Google Drive.
 * 
 * @param {string} privateKeyPath - The path to the private key JSON file.
 * @param {string} filename - The name of the file to upload.
 * @param {string} parent_folder_id - The ID of the parent folder on Google Drive.
 * @param {boolean} delete_after_upload - Whether to delete the file after upload.
 */
function uploadFileOnGoogleDrive(privateKeyPath, filename, parent_folder_id, delete_after_upload = false) {
    const key = require(privateKeyPath);

    // Initialize JWT client for authentication
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/drive'],
        null
    );

    // Create Google Drive instance
    const drive = google.drive('v3');

    jwtClient.authorize((authErr) => {
        if (authErr) return console.log('Authentication failed: ' + authErr);

        const fileMetadata = {
            name: filename,
            parents: [parent_folder_id]
        };

        const media = {
            mimeType: 'text/plain',
            body: fs.createReadStream(filename)
        };

        drive.files.create({
            auth: jwtClient,
            resource: fileMetadata,
            media,
            fields: 'id'
        }, (err, file) => {
            if (err) return console.log('The API returned an error: ' + err);
            console.log('File created with ID: ', file.data.id);

            if (delete_after_upload) {
                fs.unlink(filename, (err) => {
                    if (err) {
                        console.log('An error occurred while deleting the DB file: ' + err);
                    }
                });
            }
        });
    });
}

module.exports = uploadFileOnGoogleDrive;
