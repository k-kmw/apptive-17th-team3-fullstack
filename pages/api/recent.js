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

    const date = new Date();
    let oneWeekLater = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    let oneWeekBefore = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

    const calendar = google.calendar({version: 'v3', auth});
    const cal_list = await calendar.calendarList.list();
    const twoWeekEvents = await Promise.all(
        cal_list.data.items.map(async cal => {
            const cal_res = await calendar.events.list({
                calendarId: cal.id,
                timeMin: oneWeekBefore.toISOString(),
                timeMax: oneWeekLater.toISOString(),
                singleEvents: true,
                timeZone : "Asia/Seoul",
                orderBy : 'startTime',
            });
            
            return cal_res.data.items.map(obj => {return {...obj, projectID: cal.id};});
        })
    );

    const data = twoWeekEvents.flat()
        .filter(e => e.start.dateTime != null)
        .sort((e1, e2) => e1.end.dateTime < e2.end.dateTime)
        .map(e => {
            return {
                projectID : e.projectID,
                status: e.extendedProperties?.private?.status,
                created: e.created,
                updated: e.updated,
                summary: e.summary,
                start: e.start,
                end: e.end,
                id: e.id
            };
        });

    
    res.status(200).json(data);
};