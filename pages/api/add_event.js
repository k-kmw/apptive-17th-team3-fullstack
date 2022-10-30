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
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2022-10-30T09:00:00-07:00',
            'timeZone': 'Asia/Seoul',
        },
        'end': {
            'dateTime': '2022-10-30T17:00:00-07:00',
            'timeZone': 'Asia/Seoul',
        },
        'recurrence': ['RRULE:FREQ=DAILY;COUNT=2'],
        'attendees': [{'email': 'lpage@example.com'},{'email': 'sbrin@example.com'},],
        'status' : "tentative"
    };
    
    calendar.events.insert(
        {
            auth: auth,
            calendarId: 'vfldkg6gmbpo93qdf2ku34v8f0@group.calendar.google.com',
            // calendarId: 'primary',
            resource: event,
        }, 
        function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.id);
            res.status(200).send(event.id);
        }
    );
};