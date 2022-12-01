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
    auth.setCredentials({refresh_token : refresh_token,});
    const calendar = google.calendar({version: 'v3', auth});

    //using timeMin, timeMax we can get 14day's of event
    const cal_res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    const events = cal_res.data.items;

    if (!events || events.length === 0) {
        console.log('No upcoming events found.');
        return;
    }

    const data = events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        return `${start} - ${event.summary}`;
    });

    res.status(200).json(data);
};