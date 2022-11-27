const { defineConfig } = require("@vue/cli-service");
const config = require("./src/config.json");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    host: "localhost",
    port: config.port,
  },
});
