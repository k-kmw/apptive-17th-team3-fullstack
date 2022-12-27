import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './calendar.module.css';

// const Calendar = (props) => {
//     const [dailys, setDailys] = useState();
//     let now = new Date();
//     const week = ['일', '월', '화', '수', '목', '금', '토']
//     const getDailys = async () => {
//         const res = await axios.get(`/api/daily`);
//             setDailys(res.data);
//     }
//     useEffect(() => {
//         getDailys();
//     }, [])
//     const displayTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
//     console.log(dailys);
//     return (
//         <div className={styles.calendar}>
//             <div className={styles.header}>
//                 <div>{now.getMonth() + 1}월 {now.getDate()}일</div>
//                 <div className={styles.weekAndBtn}>
//                     <p className={styles.week}>{week[now.getDay()]}요일</p>
//                     <form action="">
//                         <button className={styles.btn}>+일정 추가하기</button>
//                     </form>
//                 </div>
//             </div>

//             <div className={styles.body}>
//                 <div className={styles.timegrid}>
//                     <div className={styles.gridItem}>
//                         <div className={styles.time}>
//                             <sup style={{ fontSize: '8px' }}>AM</sup>12</div>
//                             <div className={styles.timeLine}></div>
//                     </div>
//                     {displayTimes.map(time => <div className={styles.gridItem}><div className={styles.time}>{time}</div></div>)}
                    
//                     <div className={styles.gridItem}>
//                         <div className={styles.time}><sup style={{ fontSize: '8px' }}>PM</sup>12</div>
//                         <div className={styles.timeLine}></div>
//                     </div>
//                     {displayTimes.map(time => <div className={styles.gridItem}><div className={styles.time}>{time}</div></div>)}
//                 </div>
//                 <div className={styles.grid}>
//                     {/* <div className={styles.gridItem}><div className={styles.time}><sup style={{ fontSize: '8px' }}>AM</sup>12</div><div className={styles.timeLine}></div><div className={styles.gridContents}  style={{top:`${parseInt(dailys[1].start.dateTime.slice(11, 13)) + 290}px`}}>{dailys[0].summary}{dailys[1].start.dateTime}</div></div>
//                         {displayTimes.map(time => <div className={styles.gridItem}><div className={styles.time}>{time}</div><div className={styles.timeLine}></div></div>)}

//                         <div className={styles.gridItem}><div className={styles.time}><sup style={{ fontSize: '8px' }}>PM</sup>12</div><div className={styles.timeLine}></div></div>
//                         {displayTimes.map(time => <div className={styles.gridItem}><div className={styles.time}>{time}</div><div className={styles.timeLine}></div></div>)} */}
//                     {/* {Array(24).fill(0).map(i => <div className={styles.gridItem}></div>)} */}
//                     {dailys && dailys.map((daily) => {
//                     return (
//                         <div className={styles.Contents}
//                             style={{ gridRowStart: `${parseInt(daily.start.dateTime.slice(11, 13)) + 1}`, gridRowEnd: `${parseInt(daily.end.dateTime.slice(11, 13)) + 1}` }} >
//                             <div className={styles.gridItem_half1} >{daily && daily.summary}</div>
//                             <div className={styles.gridItem_half2}>{daily && daily.start.dateTime.slice(11, 16)}~{daily && daily.end.dateTime.slice(11, 16)}</div>
//                     </div>
//                     )
//                 })}
                    
//                 </div>
                
                
//             </div>

//         </div>
//     )
// };

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast, localeKo } from '@mobiscroll/react';

function Calendar() {

    const [myEvents, setEvents] = React.useState([]);

    // React.useEffect(() => {
    //     getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
    //         console.log(events);
    //         setEvents(events);
    //     }, 'jsonp');
    // }, []);
    
    const getEvents = async () => {
        const res = await axios.get('/api/daily');
        setEvents(res.data);
        // const events = res.data.lists.map((item) => {
        //     const obj = {};
        //     obj["title"] = item.summary;
        //     obj["start"] = item.start.dateTime;
        //     obj["end"] = item.end.dateTime;
        //     if (!obj.start) {
        //         obj["allDay"] = true;
        //         obj["start"] = item.start.date
        //         obj["end"] = item.end.date
        //     }
        //     return obj;
        // })
        // setEvents(events);
    }
    console.log(myEvents);
    useEffect(() => {
        getEvents();
    }, [])
    const onEventClick = React.useCallback((event) => {
        toast({
            // message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            schedule: { type: 'day' }
        };
    }, []);

    return (
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
            // clickToCreate={true}
            // dragToCreate={true}
            // dragToMove={true}
            // dragToResize={true}
            // eventDelete={true}
            locale={localeKo}
            data={myEvents}
            view={view}
            className={styles.calendar}
            onEventClick={onEventClick}
       />
    ); 
}


export default Calendar;

    //         <div className={styles.body}>
    //             {dailys && dailys.map(daily => <div>{daily.start.dateTime.slice(11, 16)}</div>)}
    //         </div>

                //     <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox} style={{ backgroundColor: "pink" }}>
                //         <div style={{ height: "10px", fontSize: "9px" }}>{dailys && dailys[1].summary}</div>
                //         <div className={styles.line}></div>
                //         <div style={{ height: "10px", fontSize: "9px" }}>시간</div>
                //     </div>
                // </div>
                // <div className={styles.timeline}><span>AM</span><span>1</span>
                //     <div className={styles.linebox} style={{ backgroundColor: "skyblue" }}>
                //         <div style={{ height: "10px", fontSize: "5px" }}><span style={{ fontSize: '5px' }} >기획A팀</span></div>
                //         <div className={styles.line} style={{display: 'none'}}></div>
                //         <div style={{ height: "10px", fontSize: "9px" }}>시간2</div>
                //     </div>
                // </div>
                //                 <div className={styles.timeline}><span>AM</span><span>2</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>3</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>4</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>
                //                                 <div className={styles.timeline}><span>AM</span><span>12</span>
                //     <div className={styles.linebox}><div className={styles.line}></div></div>
                // </div>