module.exports = {
  apps: [
    {
      name: 'qxchat-site',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
}
