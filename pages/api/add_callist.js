import { getToken } from 'next-auth/jwt';
const {google} = require('googleapis');

const [secret,clientId,clientSecret,apiKey] = [
    process.env.SECRET, process.env.GOOGLE_CLIENT_ID, 
    process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_APIKEY
];

export default async (req, res) => {
    const token = await getToken({ req, secret });
    let {access_token,id_token, refresh_token} = {...token};
    
    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({refresh_token : refresh_token});
   
    const calendar = google.calendar({version: 'v3', auth});
    const cal_res = await calendar.calendars.insert({
        requestBody: {
            // request body parameters
            // {
            //   "conferenceProperties": {},
              "description": "description for Project A",
            //   "etag": "my_etag",
            //   "id": "my_id",
            //   "kind": "my_kind",
            //   "location": "my_location",
              "summary": "Project A",
              "timeZone": "Asia/Seoul"
            // }
          },
    });
    // data: {
    //     kind: 'calendar#calendar',
    //     etag: '"IRhQ0KJ1wnZxgCLJPMnSpalgMqc"',
    //     id: 'vfldkg6gmbpo93qdf2ku34v8f0@group.calendar.google.com',
    //     summary: 'Project A',
    //     description: 'description for Project A',
    //     timeZone: 'Asia/Seoul',
    //     conferenceProperties: { allowedConferenceSolutionTypes: [Array] }
    //   },
    console.log(cal_res.data.id);
    res.send(cal_res);
};