const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

module.exports = morgan(
  ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  {
    stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {
      flags: "a",
    }),
  }
);
