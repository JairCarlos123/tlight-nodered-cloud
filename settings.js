const bcrypt = require('bcryptjs');
const path = require('path');
const username = process.env.ADMIN_USER || 'admin';
const password = process.env.ADMIN_PASSWORD;
if (!password || password.length < 16) {
    throw new Error('Define ADMIN_PASSWORD with at least 16 characters in Render.');
}
const hash = bcrypt.hashSync(password, 10);
module.exports = {
    uiPort: Number(process.env.PORT || 1880),
    uiHost: '0.0.0.0',
    httpAdminRoot: '/red',
    httpNodeRoot: '/',
    flowFile: path.join(__dirname, 'flows.json'),
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET || password,
    adminAuth: {
        type: 'credentials',
        users: [{username, password: hash, permissions: '*'}]
    },
    httpNodeAuth: {user: username, pass: hash},
    contextStorage: {default: {module: 'memory'}},
    editorTheme: {projects: {enabled: false}},
    logging: {console: {level: 'info', metrics: false, audit: false}}
};
