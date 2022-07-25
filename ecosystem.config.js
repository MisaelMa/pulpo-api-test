module.exports = {
  apps: [
    {
      name: 'pulpo',
      script: './dist/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
