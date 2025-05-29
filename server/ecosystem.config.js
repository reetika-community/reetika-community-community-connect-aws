module.exports = {
  apps: [
    {
      name: "my-community-server", // A name for your application
      script: "./server.js",       // The main script to run
      cwd: "./server",             // Set the current working directory for the app

      // Default environment variables
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        // Keep sensitive information OUT of this file and use a secure method for production!
        // MONGODB_URI: "mongodb://localhost:27017/mycommunitydb" // For local dev
      },

      // Environment-specific variables (e.g., for production)
      env_production: {
        NODE_ENV: "production",
        PORT: 80, // Default HTTP port
        // MONGODB_URI should be retrieved securely in production (e.g., from AWS SSM)
        // You would typically not hardcode this here for a production deployment.
        // Instead, your server.js would fetch it at runtime from a secure source.
        // Or, if using Elastic Beanstalk, you'd set it directly in EB config.
        // If you absolutely must, you can pass it from a shell variable, but this is less secure:
        // MONGODB_URI: process.env.PM2_MONGODB_URI
      },

      // You can add more environments like env_staging, env_test, etc.
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3001,
        // MONGODB_URI: "..." // Staging MongoDB URI
      },

      // Optional: Watch for file changes and restart (good for development)
      watch: true,
      ignore_watch: ["node_modules", "logs", ".git"], // Directories to ignore from watch
      
      // Optional: Logging configuration
      log_file: "logs/combined.log",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    },
  ],
};
