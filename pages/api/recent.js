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

    
    const proj_res = await calendar.calendarList.list();

    const lists = proj_res.data.items.map(e => {
        return {
            projectID : e.id,
            title : e.summary,
            description : e.description,
        };
    });
    
    var results=[];
    const time = new Date();
    const pos_time = new Date();
    pos_time.setDate(pos_time.getDate()+1);
    const pre_time = new Date();
    pre_time.setDate(pre_time.getDate()-1);
    const today = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
    const tomorrow =  pos_time.getFullYear()+"-"+(pos_time.getMonth()+1)+"-"+pos_time.getDate();
    const yesterday =  pre_time.getFullYear()+"-"+(pre_time.getMonth()+1)+"-"+pre_time.getDate();
    
    for(let i=0;i<lists.length;i++){ 
        
        if(lists[i].projectID.includes("ko.south_kor")) continue;
        
    const event_res = await calendar.events.list(
        {calendarId : lists[i].projectID,
        singleEvents : true,
        timeZone : 'Asia/Seoul',
        },
     );
    
    
    const e_lists = event_res.data.items.map(e=>{
    
        if(e.start.dateTime.includes(today)||e.start.dateTime.includes(yesterday)||e.start.dateTime.includes(tomorrow)){//||e.start.dateTime.includes(yesterday)||e.start.dateTime.includes(tomorrow)){
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
    
    const start_time = e=> e[2]*1000000000+e[3]*100000000+e[5]*10000000+e[6]*1000000+e[8]*100000+e[9]*10000+e[11]*1000+e[12]*100+e[14]*10+e[15]*1;
    const cur_time = (time.getFullYear()-2000)*100000000+((time.getMonth()+1)*1000000)+(time.getDate()*10000)+(time.getHours()*100)+(time.getMinutes()*1);
    
    for(i=0;i<length;i++){
        for(j=0;j<length-1-i;j++){
            if(Math.abs(start_time(daily_res[j].start)-cur_time)>Math.abs(start_time(daily_res[j+1].start)-cur_time)){
                tmp = daily_res[j];
                daily_res[j]=daily_res[j+1];
                daily_res[j+1]=tmp;
            }
        }
    }
    let recent = [];
     for(let i=0;i<4;i++){
        if(daily_res[i]==null) recent.push('no recent');
        else recent.push(daily_res[i]);
     }
    res.send(recent);
    

     
   
};
