const axios = require("axios").default;

const { param, execute, parseValues, parseParams } = require("./utils.js");
const { dependencies, devDependencies } = require("./package.json");

// todo: add to params
const user = process.env.USER | "OnionKnight621";
const repo = process.env.REPO | "repo-updater-test";
const token = process.env.TOKEN | "TsdsgNvniKWiFtEyn32IA321"

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const postData = {
  title: `package.json upd`,
  description: `package.json upd`,
  source: {
    branch: {
      name: `feature`,
    },
  },
  destination: {
    branch: {
      name: "master",
    },
  },
  close_source_branch: true,
};

const url = `https://api.bitbucket.org/2.0/repositories/${user}/${repo}/pullrequests`;

async function makeReq() {
  const { data } = await axios.post(url, postData, { headers });
  console.log(data);
}

function goThrough(i, arr) {
  if (i < arr.length) {
    console.log(`Processing ${arr[i]}`);
    execute(`npm i ${arr[i]}`, (res) => {
      // todo: error handling
      console.log(res);

      goThrough(i + 1, arr);
    });
  } else {
    makeReq()
  }
}

const updAll = Object.keys(parseParams(process.argv)).find(
  (item) => item === "--updateAll"
);

if (updAll) {
  // todo: additional parcing of versions
  const modulesToUpdate = Object.keys({ ...dependencies, ...devDependencies }); // decide if devDependencies are needed

  goThrough(0, modulesToUpdate);
} else {
  // todo: additional parcing of versions
  const modulesToUpdate = parseValues(param("update"));

  goThrough(0, modulesToUpdate);
}
