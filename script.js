const { param, execute, parseValues, parseParams } = require("./utils.js");
const { dependencies } = require("./package.json");

function goThrough(i, arr) {
  if (i < arr.length) {
    console.log(`Processing ${arr[i]}`);
    execute(`npm i ${arr[i]}`, (res) => {
      console.log("executed ", res);

      goThrough(i + 1, arr);
    });
  }
}

const updAll = Object.keys(parseParams(process.argv)).find(
  (item) => item === "--updateAll"
);

if (updAll) {
  const modulesToUpdate = Object.keys(dependencies);

  goThrough(0, modulesToUpdate);
} else {
  const modulesToUpdate = parseValues(param("update"));

  goThrough(0, modulesToUpdate);
}
