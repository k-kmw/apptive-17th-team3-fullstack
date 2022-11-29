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

    const {date } = req.query;
    
    const proj_res = await calendar.calendarList.list();

    const lists = proj_res.data.items.map(e => {
        return {
            projectID : e.id,
            title : e.summary,
            description : e.description,
        };
    });
    
    var results=[];
    
    
    for(let i=0;i<lists.length;i++){ 
       
        if(lists[i].projectID.includes("#")) continue; 
    
        const event_res = await calendar.events.list(
            {calendarId : lists[i].projectID,
            singleEvents : true,
            orderBy : 'startTime',
            timeZone: 'Asia/Seoul'},
        );
    
    
    const e_lists = event_res.data.items.map(e=>{
    
        if(e.start.dateTime.includes(date)){
            return {
            projectName : e.organizer.displayName,
            summary : e.summary,
            description : e.description,
            location : e.location,
            start: e.start.dateTime,
            end : e.end.dateTime,
            
            }
        }
        else return 'no_event';
    }
    )
    const daily = e_lists.filter((elem)=>elem!== 'no_event');
   
    if(daily.length>0)  results.push(daily);
    
    }
    let daily_res =[];
    results.forEach(e=>{
        daily_res = [...daily_res,...e];
    })

    var length = daily_res.length;
    var i,j,tmp;

    for(i=0;i<length;i++){
        for(j=0;j<length-1-i;j++){
            if(daily_res[j].start>daily_res[j+1].start){
                tmp = daily_res[j];
                daily_res[j]=daily_res[j+1];
                daily_res[j+1]=tmp;
            }
        }
    }

    res.send(daily_res);
    

   
    


    
    
};
