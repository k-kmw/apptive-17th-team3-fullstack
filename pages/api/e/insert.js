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

    const {projectID, title, start, end, location, description} = req.query;
    var event = {
        'summary': title,
        'location': location,
        'description': description,
        'start': {'dateTime': start, 'timeZone': 'Asia/Seoul'},
        'end': {'dateTime': end,'timeZone': 'Asia/Seoul'},
        'status' : "tentative",
    };
    
    calendar.events.insert(
        {calendarId: projectID,resource: event,}, 
        function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            res.status(200).send(event.id);
        }
    );
};