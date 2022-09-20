const { param, execute, parseValues, parseParams } = require("./utils.js");
const { dependencies, devDependencies } = require("./package.json");

function goThrough(i, arr) {
  if (i < arr.length) {
    console.log(`Processing ${arr[i]}`);
    execute(`npm i ${arr[i]}`, (res) => {
      // todo: error handling
      console.log(res);

      goThrough(i + 1, arr);
    });
  }
}

const updAll = Object.keys(parseParams(process.argv)).find(
  (item) => item === "--updateAll"
);

if (updAll) {
  const modulesToUpdate = Object.keys({...dependencies, ...devDependencies});

  goThrough(0, modulesToUpdate);
} else {
  const modulesToUpdate = parseValues(param("update"));

  goThrough(0, modulesToUpdate);
}
