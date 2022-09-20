const { exec } = require("child_process");

// execute command
exports.execute = function (cmd, callback) {
  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.log("Exec err: ", error);
      throw new Error(error);
    }

    if (stderr) [callback(stderr)];

    callback(stdout);
  });
};

// exit helper
const exit = (message = "") => {
  console.log(message);
  process.exit(0);
};

// parse cmd params
const parseParams = (args) => {
  let params = {};

  args.forEach((param) => {
    if (!param.startsWith("--")) return;

    const split = param.split("=").map((item) => item.trim());

    params = {
      ...params,
      [split[0]]: split[1],
    };
  });

  return params;
};

exports.parseParams = parseParams;

// get param
exports.param = (name, opts) => {
  const params = parseParams(process.argv);

  if (!Object.keys(params).length) return null;

  if (!params[`--${name}`] && opts?.default) {
    return opts?.default;
  }

  if (!params[`--${name}`]) {
    exit(`Argument '--${name}' is required`);
  }

  return params[`--${name}`].toLowerCase();
};

// parse param values
exports.parseValues = (string) => {
  const params = string ? string.trim().split(",") : [];

  return params.filter((item) => item != "");
};
