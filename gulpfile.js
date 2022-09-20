const gulp = require("gulp");
const axios = require("axios").default;

gulp.task("createpr", async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.argv[4]}`,
  };
  const postData = {
    title: `${process.argv[6]}`,
    description: `${process.argv[12]}`,
    source: {
      branch: {
        name: `${process.argv[6]}`,
      },
    },
    destination: {
      branch: {
        name: "master",
      },
    },
    close_source_branch: true,
    reviewers: process.argv[14],
  };
  const url = `https://api.bitbucket.org/2.0/repositories/${process.argv[8]}/${process.argv[10]}/pullrequests`;

  const { data } = axios.post(url, postData, { headers });
  console.log(data);
});
