module.exports = {
    apps: [
        {
            name: 'api-prod',
            script: '/opt/api/prod/dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'production',
                DB_CONNECTION_STRING: 'mongodb://dev:devAPP23@localhost:4000/production',
            },
        },
    ],
};
