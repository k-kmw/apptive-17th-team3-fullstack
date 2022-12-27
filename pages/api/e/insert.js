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

    const {projectID, title, start, end, hour, minute, description, allday} = req.body;
    let startTime, endTime;
    if(allday == "on"){
        startTime = `${start}T00:00:00+09:00`;
        endTime = `${end}T23:59:59+09:00`;
    }
    else{
        startTime = `${start}T${hour[0]}:${minute[0]}:00+09:00`;
        endTime   = `${end}T${hour[1]}:${minute[1]}:00+09:00`;
    }

    var event = {
        'summary': title,
        'description': description,
        'start' : {'dateTime':startTime,'timeZone':'Asia/Seoul'},
        'end'  : {'dateTime' : endTime,'timeZone':'Asia/Seoul'},
        'extendedProperties' : {'private' : {'status': 'test'}},
    };
    
        calendar.events.insert(
        {calendarId: projectID,resource: event,}, 
        function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
           res.redirect('/');
        //    res.status(200).send(event.id);
        }
    );
};

// {
//     kind: 'calendar#event',
//     etag: '"3335501129626000"',
//     id: '68rj0dhj6gp3ib9o69hm8b9k6tgjib9oc5h64b9hccs62phh6kr66e3374',
//     status: 'confirmed',
//     htmlLink: 'https://www.google.com/calendar/event?eid=NjhyajBkaGo2Z3AzaWI5bzY5aG04YjlrNnRnamliOW9jNWg2NGI5aGNjczYycGhoNmtyNjZlMzM3NCBidXNidHZpQG0',
//     created: '2022-11-06T16:02:44.000Z',
//     updated: '2022-11-06T16:02:44.813Z',
//     summary: '테스트',
//     creator: { email: 'busbtvi@gmail.com', self: true },
//     organizer: { email: 'busbtvi@gmail.com', self: true },
//     start: { date: '2022-11-07' },
//     end: { date: '2022-11-08' },
//     transparency: 'transparent',
//     iCalUID: '68rj0dhj6gp3ib9o69hm8b9k6tgjib9oc5h64b9hccs62phh6kr66e3374@google.com',
//     sequence: 0,
//     reminders: { useDefault: false },
//     eventType: 'default'
// }

// projectID: vfldkg6gmbpo93qdf2ku34v8f0@group.calendar.google.com
// projectName: Project A
// title: ㅁㅁ
// start: 2022-12-02
// hour: 01
// minute: 00
// end: 2022-12-02
// hour: 02
// minute: 00
// description: ㅁ
