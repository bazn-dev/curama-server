// const { Octokit } = require("@octokit/rest");
// const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const { request } = require("@octokit/request");

const authentication = async () => {
  const result = await request("GET /user/repos", {
    headers: {
      Authorization: "token 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",
    },
    type: "owner",
    access_token: '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'
  });
  
  console.log(result.data.map(item => item.full_name));
  
  // https://api.github.com/repos/bazn-dev/bazn-dev/git/trees/master?recursive=1
  
  const repoFiles = await request("GET /repos/bazn-dev/bazn-dev/git/trees/master", {
    headers: {
      Authorization: "token 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",
    },
    type: "owner",
    access_token: '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',
    recursive: 1
  });
  
  //console.log(repoFiles.data.tree)
  
  const file = await request("GET /repos/bazn-dev/bazn-dev/git/blobs/8153ca79b6b3ae828dcd6fd930930035fbe605e2", {
    headers: {
      Authorization: "token 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",
    },
    type: "owner",
    access_token: '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',
    recursive: 1
  });
  
  
  console.log(Buffer.from(file.data.content, 'base64').toString('UTF-8'));
}
authentication();

