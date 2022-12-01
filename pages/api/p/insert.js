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

    const {title, description, location} = req.query;
    const cal_res = await calendar.calendars.insert({
        requestBody: {
            "description": description,
            "summary": title,
            "location" : location,
            "timeZone": "Asia/Seoul",   
        },
    });
    // res.status(200).json(data);
    res.send(cal_res.data.id);
};