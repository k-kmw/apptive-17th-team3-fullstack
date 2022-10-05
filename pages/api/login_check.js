const path = require('path');
const process = require('process');
const {google} = require('googleapis');

export default async function handler(req, res) {
  const TOKEN_PATH = path.join(process.cwd(), 'token.json');
  const content = require(TOKEN_PATH);
  // const content = require("../../token.json");
  res.send(google.auth.fromJSON(content));
};