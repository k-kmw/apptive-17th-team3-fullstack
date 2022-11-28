import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './calendar2.module.css';

const Calendar2 = (props) => {
    const [dailys, setDailys] = useState();
    const [dailysObj, setDailysObj] = useState();
    let now = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const getDailys = async () => {
        const res = await axios.get(`http://localhost:4000/api/daily`);
            setDailys(res.data);
    }
    useEffect(() => {
        getDailys();
    }, [])
    const displayTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const forTimeLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const LINESPACE = 32.6

    useEffect(() => {
        const dailysObj = dailys && dailys.map(daily => ({        
        "id": daily.created,
        "startDate": !(daily.allDay==true) && daily.start,
        "endDate": !(daily.allDay==true) && daily.end,
        "startHour": !(daily.allDay==true) && parseInt(daily.start.slice(11, 13)),
        "endHour": !(daily.allDay==true) && parseInt(daily.end.slice(11, 13)),
        "startMinute":!(daily.allDay==true) && daily.start.slice(14, 16),
        "endMinute":!(daily.allDay==true) && daily.end.slice(14, 16),
        "height": !(daily.allDay==true) && (parseInt(daily.end.slice(11, 13)) - parseInt(daily.start.slice(11, 13))) * LINESPACE + (parseInt(daily.end.slice(14, 16)) - parseInt(daily.start.slice(14, 16))) / 60 * LINESPACE,
        "title": daily.title,
        "color": daily.color,
        "allDay": daily.allDay,
        "count": 1,
        }))
        setDailysObj(dailysObj)
        dailysObj && calDupDaily(dailysObj)
    }, [dailys])

    // dailysObj && console.log(dailysObj[1].startDate < dailysObj[2].startDate)
    // dailysObj && console.log(dailysObj[1].startDate, dailysObj[2].startDate)
    
    
    const calDupDaily = (dailysObj) => {
        dailysObj.map(daily => {
            let posNum = 0
            for (let i = 0; i < dailysObj.length; i++){
                if ((daily.startDate <= dailysObj[i].endDate) && (daily.endDate >= dailysObj[i].startDate)) {
                    if (daily == dailysObj[i])
                        continue
                    daily['count'] += 1
                    daily['posNum'] = ++posNum
                    dailysObj[i]['posNum'] = ++posNum
                }
            }
        })
        console.log(dailysObj)
    }
    

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <div>{now.getMonth() + 1}월 {now.getDate()}일</div>
                <div className={styles.weekAndBtn}>
                    <p className={styles.week}>{week[now.getDay()]}요일</p>
                    <form action="">
                        <button className={styles.btn}>+일정 추가하기</button>
                    </form>
                </div>
                <div className={styles.allday}>
                    <span className={styles.allDayBanner}>하루 종일</span>
                    {dailysObj && dailysObj.map((daily) => daily.allDay ? <span className={styles.allDayTitle}>{daily.title}</span> : '')}
                </div>
            </div>


            <div className={styles.body}>
                <div className={styles.times}>
                    <div className={styles.time}><span className={styles.isDay}>AM</span><span style={{fontSize: '13px', fontWeight: '500'}}>12</span></div>
                    {displayTimes.map(time => <div className={styles.time}>{time}</div>)}
                    <div className={styles.time}><span className={styles.isDay}>PM</span><span style={{ fontSize: '13px', fontWeight: '500' }}>12</span></div>
                    {displayTimes.map(time => <div className={styles.time}>{time}</div>)}                    
                </div>


                <div className={styles.dailys}>
                    {forTimeLine.map(i =>
                        <div className={styles.timeline} style={{top: `${i*LINESPACE-11}px`}}></div>
                    )}
                    {forTimeLine.map(i =>
                        <div className={styles.timeline} style={{top: `${(i*LINESPACE-11)}px`}}></div>
                    )}
                    {dailysObj && dailysObj.map((daily) => {
                        if (daily.allDay == true) return null
                        else
                        return (
                            <div className={styles.daily} style={{
                                top: `${LINESPACE * (daily.startHour + 1) + parseInt(daily.startMinute) / 60 * LINESPACE - 11}px`,
                                // left: `${daily.posNum > 1 ? daily.posNum*(100/(daily.count)) : null}px`,
                                right: `${daily.posNum > 1 ? 0 : null}px`,
                                height: `${daily.height}px`,
                                backgroundColor: `${daily.color}`,
                                width: `${100/(daily.count)}%`
                            }} key={daily.id}>
                                <div className={styles.title}>{daily.title}</div>
                                <div className={styles.dailyTime}>{daily.startHour}:{daily.startMinute} ~ {daily.endHour}:{daily.endMinute}</div>
                            </div>)
                })}
                
                </div>
            </div>
       </div>
    )
};



export default Calendar2;

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
