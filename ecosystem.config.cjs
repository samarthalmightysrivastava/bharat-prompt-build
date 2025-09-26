module.exports = {
  apps: [
    {
      name: 'bharat-prompt',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G'
    }
  ]
}