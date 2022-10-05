const {google} = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');

async function t(){
// export const authCheck = () => {
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    // console.log(credentials);
    
    
    const content1 = require("../token.json");
    console.log(content1);
    console.log(google.auth.fromJSON(credentials));
    // return google.auth.fromJSON(credentials);
// };
}
t();