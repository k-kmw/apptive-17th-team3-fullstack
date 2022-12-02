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
    const cal_list = await calendar.calendarList.list();
    const twoWeekEvents = await Promise.all(
        cal_list.data.items.map(async cal => {
            const cal_res = await calendar.events.list({
                calendarId: cal.id,
                timeMin: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                timeMax: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });

            return cal_res.data.items
                .filter(e => e.start.dateTime != null)
                .map(e => {
                    const allday = (e.start.dateTime.includes(`00:00:00`) && e.end.dateTime.includes(`23:59:59`));
                    return {
                        color: cal.backgroundColor,
                        created: e.created,
                        updated: e.updated,
                        summary: e.summary,
                        allday: allday,
                        start: e.start,
                        end: e.end,
                        id: e.id,
                        status: e.extendedProperties?.private?.status,
                    };
                });
        })
    );

    // const data = twoWeekEvents.flat().filter(e => e.start.dateTime != null).map(e => {
    //     const allday = (e.start.dateTime.includes(`00:00:00`) && e.end.dateTime.includes(`23:59:59`));
    //     return {
    //         created: e.created,
    //         updated: e.updated,
    //         summary: e.summary,
    //         allday: allday,
    //         start: e.start,
    //         end: e.end,
    //     };
    // });
    res.status(200).json(twoWeekEvents.flat());
}