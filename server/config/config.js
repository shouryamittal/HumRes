const env = process.env.NODE_ENV || 'development';

if(env === "development") {
    const config = require("./config.json");
    config_env = config[env];

    Object.keys(config_env).forEach(key => {
        process.env[key] = config_env[key];
    });
}