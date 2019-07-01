const cosmiconfig = require("cosmiconfig");
const { exec } = require("child_process");

const userConfig = (cosmiconfig("lint-prepush", {
  searchPlaces: [
    "package.json",
    "lintprepush.config.js",
    ".lintprepushrc",
    ".lintprepushrc.js",
    ".lintprepushrc.json",
    ".lintprepushrc.yaml",
    ".lintprepushrc.yml"
  ]
}).searchSync() || {}).config;

function execChildProcess({ command = "" } = {}) {
  return new Promise( (resolve, reject) => {
    exec(command , (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      }
      let result = (stdout.toString() || "").split('\n');
      result = result.slice(0,-1);
      result = result.join('\n');
      resolve(result);
    });
  });
}

module.exports = {
  userConfig,
  execChildProcess
};
