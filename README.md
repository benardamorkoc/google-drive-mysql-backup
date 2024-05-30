# Google Drive Mysql Backup

- Backs up your mysql data to your google drive

# Usage

```js
const createAndUploadBackup = require('google-drive-mysql-backup');

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'databasename'
};

// Google Drive configuration
const googleDriveConfig = {
    parentId: 'root',
    deleteAfterUpload: false
};

// Path to the private key JSON file
const privateKeyPath = './path/to/your/private_key.json';

// Create and upload backup
createAndUploadBackup(privateKeyPath, dbConfig, googleDriveConfig)
    .then(() => console.log('Backup created and uploaded successfully'))
    .catch(err => console.error('Error during backup and upload:', err));
```
