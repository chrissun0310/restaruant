export default {
  apps: [
    {
      name: "sun-master-fengshui",
      script: "serve",
      args: "-s dist -l 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      },
      max_memory_restart: "256M",
      restart_delay: 3000
    }
  ]
};
