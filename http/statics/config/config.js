const debug = require("debug")("statics:config");
const path = require('path')

const config = {
  host: "localhost",
  port: 8080,
  root: path.resolve(__dirname, '..', 'public')
};

// bash: export DEBUG=statics:config
// win: set DEBUG=statics:config
debug(config)
module.exports = config