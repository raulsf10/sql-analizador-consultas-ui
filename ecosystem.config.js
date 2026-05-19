module.exports = {
  apps: [{
    name: 'sql-analizador-consultas-ui',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3004,
    },
  }],
}
