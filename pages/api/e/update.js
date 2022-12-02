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
    const {projectID, title, start, end, hour, minute, description, allday, status} = req.body;
    let startTime, endTime;
    if(allday == "on"){
        startTime = `${start}T00:00:00+09:00`;
        endTime = `${end}T23:59:59+09:00`;
    }
    else{
        startTime = `${start}T${hour[0]}:${minute[0]}:00+09:00`;
        endTime   = `${end}T${hour[1]}:${minute[1]}:00+09:00`;
    }

    const event = {
        "summary": title,
        "description": description,
        "start": {'dateTime': startTime, 'timeZone': 'Asia/Seoul'},
        "end": {'dateTime': endTime,'timeZone': 'Asia/Seoul'},
        'extendedProperties' : {'private' : {'status': status}},
    };
    
    calendar.events.patch(
        {calendarId: projectID, eventId: eventID, requestBody: event}, 
        function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            res.status(200).send("success");
        }
    );
};