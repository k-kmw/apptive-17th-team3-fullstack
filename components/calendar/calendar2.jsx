import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './calendar2.module.css';

const Calendar2 = ({openForm, dailysObj, LINESPACE, currentTime, update, setUpdate, calnedarUpdate, setCalendarUpdate}) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const displayTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const forTimeLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const calDupDaily = (dailysObj) => {
        dailysObj.map(daily => {
            let posNum = 1
            for (let i = 0; i < dailysObj.length; i++){
                if ((daily.startDate <= dailysObj[i].endDate) && (daily.endDate >= dailysObj[i].startDate)) {
                    if (daily == dailysObj[i])
                        continue
                    daily['count'] += 1;
                    daily['posNum'] = posNum;
                    posNum += 1;
                    if(dailysObj[i]['posNum'] != posNum)
                        dailysObj[i]['posNum'] = posNum;
                }
            }
        })
    }
    const now = currentTime && new Date(currentTime.getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
    // console.log(dailysObj);
    // console.log(new Date(currentTime.getTime()+ 1000 * 60 * 60 * 9).toISOString().slice(0, 10));
    // console.log(dailysObj[0].endDate.dateTime.slice(0, 10));
    // console.log(dailysObj && dailysObj[0].startDate.dateTime.slice(0, 10) < now && now < dailysObj && dailysObj[0].endDate.dateTime.slice(0, 10) )
    // console.log(dailysObj[2].startDate.dateTime);
    // console.log(dailysObj[2].endDate.dateTime);
    // console.log(dailysObj[2].startDate.dateTime.slice(0, 10) == dailysObj[2].endDate.dateTime.slice(0, 10));
    // dailysObj && console.log(dailysObj);

    const deleteDaily = (projectID, id, e) => {
        e.preventDefault();
        // console.log(projectID);
        // console.log(id);
        if (confirm('삭제하시겠습니까?') == false) {
            return;
        }
        else {
            const encodedProjectID = encodeURIComponent(projectID);
            const encodedeventID = encodeURIComponent(id);
            axios.delete(`/api/e/delete?projectID=${encodedProjectID}&eventID=${encodedeventID}`)
                .then(res => { 
                    if (res.status == 200) {
                        setCalendarUpdate({ ...calnedarUpdate })
                        setUpdate({ ...update });
                    }
                });
        }
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <div>{currentTime && currentTime.getMonth() + 1}월 {currentTime && currentTime.getDate()}일</div>
                <div className={styles.weekAndBtn}>
                    <p className={styles.week}>{week[currentTime && currentTime.getDay()]}요일</p>
                    <form>
                        <button onClick={openForm} className={styles.btn}>+일정 추가하기</button>
                    </form>
                </div>
                <div className={styles.allday}>
                    <span className={styles.allDayBanner}>하루 종일</span>
                    {dailysObj && dailysObj.map((daily) => daily.allday 
                        ? <span key={daily.id} onContextMenu={(e) => deleteDaily(daily.projectID, daily.id, e)} className={styles.allDayTitle}>{daily.title}</span> : '')}
                </div>
            </div>


            <div className={styles.body}>
                <div className={styles.times}>
                    <div className={styles.time}><span className={styles.isDay}>AM</span><span style={{fontSize: '13px', fontWeight: '500'}}>12</span></div>
                    {displayTimes.map(time => <div key={time} className={styles.time}>{time}</div>)}
                    <div className={styles.time}><span className={styles.isDay}>PM</span><span style={{ fontSize: '13px', fontWeight: '500' }}>12</span></div>
                    {displayTimes.map(time => <div key={time} className={styles.time}>{time}</div>)}                    
                </div>


                <div className={styles.dailys}>
                    {forTimeLine.map(i =>
                        <div key={i} className={styles.timeline} style={{top: `${i*LINESPACE-11}px`}}></div>
                    )}
                    
                    {dailysObj && dailysObj.map((daily) => {
                        if (daily.allday == true)
                            return null
                        else
                        return (
                            <div className={styles.daily} style={{
                                top: `${(daily.startDate.dateTime.slice(0, 10) != daily.endDate.dateTime.slice(0, 10) && now == daily.endDate.dateTime.slice(0, 10)) ?
                                    21 : LINESPACE * (daily.startHour + 1) + parseInt(daily.startMinute) / 60 * LINESPACE - 11}px`,
                                // left: `${daily.posNum > 1 ? daily.posNum*(100/(daily.count)) : null}px`,
                                left: '10px',
                                right: `${daily.posNum > 1 ? 0 : null}px`,
                                height: `${daily.height}px`,
                                backgroundColor: `${daily.color}`,
                                width: `${90 / (daily.count)}%`,
                                display: `${(daily.startDate.dateTime.slice(0, 10) == daily.endDate.dateTime.slice(0, 10)) && (daily.endHour - daily.startHour <= 1) && (daily.endMinute - daily.startMinute <= 30) ? 'flex' : null}`,
                                fontSize: `${(daily.startDate.dateTime.slice(0, 10) == daily.endDate.dateTime.slice(0, 10)) && (daily.endHour - daily.startHour < 1) ? '10px' : null}`,
                                padding: `${(daily.startDate.dateTime.slice(0, 10) == daily.endDate.dateTime.slice(0, 10)) && (daily.endHour - daily.startHour <= 1) && (daily.endMinute - daily.startMinute <= 30) ? 0 : null}`,
                            }} key={daily.id} onContextMenu={(e) => deleteDaily(daily.projectID, daily.id, e)} >
                                <div className={styles.title}>{daily.title}</div>
                                <div className={styles.dailyTime}> {(daily.startDate.dateTime.slice(0, 10) != daily.endDate.dateTime.slice(0, 10) && now == daily.startDate.dateTime.slice(0, 10)) ?
                                    daily.startHour + ':' + daily.startMinute + '~' : null}
                                    {(daily.startDate.dateTime.slice(0, 10) != daily.endDate.dateTime.slice(0, 10) && now == daily.endDate.dateTime.slice(0, 10)) ?
                                        '~' + daily.endHour + ':' + daily.endMinute : null}
                                    {(daily.startDate.dateTime.slice(0, 10) == daily.endDate.dateTime.slice(0, 10)) ?
                                        daily.startHour + ':' + daily.startMinute + '~' + daily.endHour + ':' + daily.endMinute: null}
                                </div>
                            </div>)
                })}
                
                </div>
            </div>
       </div>
    )
};



export default React.memo(Calendar2);