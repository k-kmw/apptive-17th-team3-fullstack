// import { getToken } from 'next-auth/jwt';
// const {google} = require('googleapis');

// const [secret,clientId,clientSecret,apiKey] = [
//     process.env.SECRET, process.env.GOOGLE_CLIENT_ID, 
//     process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_APIKEY
// ];

export default async (req, res) => {
    const now = new Date();
    const today = now.toISOString().slice(0,10);

    const yes = new Date()
    yes.setDate(yes.getDate() - 1);
    const yesterday = yes.toISOString().slice(0,10);
 
    const tom = new Date()
    tom.setDate(tom.getDate() + 2);
    const tomorrow = tom.toISOString().slice(0,10);

    const todays_event = [
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "하루종일 일정1",
            start: `${yesterday}T08:30:00+09:00`,
            end: `${today}T15:00:00+09:00`,
            allDay: true,
        },
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "밥",
            start: `${today}T06:00:00+09:00`,
            end: `${today}T10:30:00+09:00`,
            color: 'gold',
        },
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "공부",
            start: `${today}T13:00:00+09:00`,
            end: `${today}T18:00:00+09:00`,
            color: '#228c73',
        },
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "놀기",
            start: `${today}T17:10:00+09:00`,
            end:`${today}T20:10:00+09:00`,
        },
                {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "test",
            start: `${today}T21:40:00+09:00`,
            end: `${today}T24:00:00+09:00`,
            color: 'pink',

        },
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "새벽 일정",
            start: `${today}T03:40:00+09:00`,
            end: `${today}T05:00:00+09:00`,
        },
        {
            status: "confirmed",
            created: "2022-09-26T03:16:31.000Z",
            updated: "2022-09-26T03:16:31.386Z",
            title: "test2",
            start: `${today}T13:00:00+09:00`,
            end: `${today}T17:00:00+09:00`,
            color: 'orange'
        },
    ];

    res.status(200).json(todays_event);
};
/*
{
    kind: "calendar#event",
    etag: "\"3328324382772000\"",
    id: "69j30c36chij2bb16srmab9kc5gm4bb168pj6bb26kr6cob16spm2dpo6o",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=NjlqMzBjMzZjaGlqMmJiMTZzcm1hYjlrYzVnbTRiYjE2OHBqNmJiMjZrcjZjb2IxNnNwbTJkcG82byBidXNidHZpQG0",
    created: "2022-09-26T03:16:31.000Z",
    updated: "2022-09-26T03:16:31.386Z",
    summary: "시월제",
    creator: {
        email: "busbtvi@gmail.com",
        self: true,
    },
    organizer: {
        email: "busbtvi@gmail.com",
        self: true,
    },
    start: {
        dateTime: "2022-11-01T09:00:00+09:00",
        timeZone: "Asia/Seoul",
    },
    end: {
        dateTime: "2022-11-03T18:00:00+09:00",
        timeZone: "Asia/Seoul",
    },
    iCalUID: "69j30c36chij2bb16srmab9kc5gm4bb168pj6bb26kr6cob16spm2dpo6o@google.com",
    sequence: 0,
    reminders: {
        useDefault: true,
    },
    eventType: "default",
}
*/