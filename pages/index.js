import Head from 'next/head'
import axios from 'axios';
import styles from '../styles/App.module.css'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react"

import CreateProject from '../components/create_porject/createProject';
import Navbar from '../components/navbar/navbar';
import Form from '../components/form/form';
import Calendar2 from '../components/calendar/calendar2';
import Charts from '../components/chart/charts';
import FormForNewProject from '../components/form/formForNewProject';
import RecentProject from '../components/recent_project/recent_project';

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false); // form open/close
    const [isProjectFormOpen, setIsFormProjectOpen] = useState(false);
    const [projectName, setProjectName] = useState();
    const [projectID, setProjectID] = useState("");
    const [data, setData] = useState([]);
    const [numOfSchedule, setNumOfSchedule] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [dailys, setDailys] = useState();
    const [dailysObj, setDailysObj] = useState();
    const [projectTitleToIdObject, setProjectTitleToIdObject] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [ProjectInfoUpdate, setProjectInfoUpdate] = useState({});
    const [calnedarUpdate, setCalendarUpdate] = useState({});
    const { data: session, status } = useSession()
    const formRef = useRef();

    const getData = async () => {
        const res = await axios.get(`/api/p/list`);
        return setData(res.data);
    }

    const getDailys = async () => {
        const res = await axios.get(`/api/daily`);
        return setDailys(res.data);
    }
    
    useEffect(() => {
        if (status == 'authenticated') {
            getData(); // project 리스트 받아오기
            getDailys(); // calendar 일정 받아오기 
        }
        timer();
    }, [status])

    useEffect(() => {
        if (status == 'authenticated') {
            getDailys(); // calendar 일정 받아오기 
        }
    }, [calnedarUpdate])

    const getScheduleNum = async (projectInfo) => { // doughnut 차트 프로젝트별 일정 개수
        const encoded_url = encodeURIComponent(projectInfo.projectID);
        const res = await axios.get(`/api/p/events?projectID=${encoded_url}`);
        setNumOfSchedule((cur) => [...cur, { title: projectInfo.title, num: res.data.length, projectID: projectInfo.projectID }]);
    }

    useEffect(() => {
        // console.log(data);
        if (!!data.length) {
            for (let i = 0; i < data.length; i++) {
                getScheduleNum(data[i]);
            }
        } // doughnut차트 프로젝트별 일정 개수 
        const titleIdObj = {};
        for (let i = 0; i < data.length; i++) {
            titleIdObj[data[i].title] = data[i].projectID;
        }
        setProjectTitleToIdObject(titleIdObj);
    }, [data]);

    useEffect(() => {
        const sorted = numOfSchedule.sort((a, b) => b.num - a.num);
        setSortedData(sorted);
    }, [numOfSchedule]);

    const timer = () => {
        const koreaNow = new Date((new Date()).getTime());
        setCurrentTime(koreaNow);
    }

    useEffect(() => {
        getCurrentTime();
    }, []);

    const getCurrentTime = () => {
        setInterval(timer, 1000 * 60)
    }

    // dailys && console.log(dailys);
    const LINESPACE = 32.3; // calendar 줄간격
    useEffect(() => { // calender 일정 객체 생성
        const now = currentTime && new Date(currentTime.getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
        const dailysObj = dailys && dailys.map(daily => ({
            "allday": (daily.start.dateTime.slice(0, 10) !== now) && (daily.end.dateTime.slice(0, 10) != now)
                ? true : daily.allday,
            "id": daily.id,
            "projectID": daily.projectID,
            "startDate": !(daily.allDay == true) && daily.start,
            "endDate": !(daily.allDay == true) && daily.end,
            "startHour": !(daily.allDay == true) && parseInt(daily.start.dateTime.slice(11, 13)),
            "endHour": !(daily.allDay == true) && parseInt(daily.end.dateTime.slice(11, 13)),
            "startMinute": !(daily.allDay == true) && daily.start.dateTime.slice(14, 16),
            "endMinute": !(daily.allDay == true) && daily.end.dateTime.slice(14, 16),
            "height": (!(daily.allDay == true) && (daily.end.dateTime.slice(0, 10) != daily.start.dateTime.slice(0, 10)) && (now == daily.end.dateTime.slice(0, 10))) ? 
                ((parseInt(daily.end.dateTime.slice(11, 13)) - 0) * LINESPACE
                + (parseInt(daily.end.dateTime.slice(14, 16) - 0)) / 60 * LINESPACE) :
                (daily.end.dateTime.slice(0, 10) != daily.start.dateTime.slice(0, 10)) && (now == daily.start.dateTime.slice(0, 10)) ?
                    ((24 - parseInt(daily.start.dateTime.slice(11, 13))) * LINESPACE
                    + (59 - parseInt(daily.start.dateTime.slice(14, 16))) / 60 * LINESPACE) :
                ((parseInt(daily.end.dateTime.slice(11, 13)) - parseInt(daily.start.dateTime.slice(11, 13))) * LINESPACE
                + (parseInt(daily.end.dateTime.slice(14, 16)) - parseInt(daily.start.dateTime.slice(14, 16))) / 60 * LINESPACE),
            "title": daily.summary,
            "color": daily.color,
            "allDay": daily.allDay,
            "count": 1,
            "posNum": 0,
        }))
        setDailysObj(dailysObj)
        // dailysObj && calDupDaily(dailysObj)
    }, [dailys])


    const openForm = (name, projectID, e) => { // form open시키는 함수
        if (!session) {
            alert("로그인을 해주세요");
            return;
        } // 로그인 확인
        formRef.current && formRef.current.reset(); // form열때 초기화

        e && setProjectName(name); // click한 프로젝트 이름 받아와서 설정 
        e && setProjectID(projectID); // click한 프로젝트 ID 받아와서 설정 
        setIsFormOpen(true);
        setIsFormProjectOpen(false);
        // console.log(formRef.current);  
    }

    const openFormForProject = () => {
        if (!session) {
            alert("로그인을 해주세요");
            return;
        } // 로그인 확인
        formRef.current && formRef.current.reset(); // form열때 초기화
        setIsFormProjectOpen(true);
        setIsFormOpen(false);
    }

    const closeFormForProject = () => {
        setIsFormProjectOpen(false);
    }

    const closeForm = (e) => { // form 닫기
        setIsFormOpen(false);
        setProjectName(null);
    }

    let form_or_calendar;
    if (isFormOpen) {
        form_or_calendar = (<Form closeForm={closeForm} projectID={projectID} projectName={projectName} formRef={formRef}
            projectTitleToIdObject={projectTitleToIdObject} currentTime={currentTime} />);
        // state에 저장한 것을 props로 내려줌
        // project name을 클릭이벤트로 받아서
    }
    else if (isProjectFormOpen) {
        form_or_calendar = (<FormForNewProject closeFormForProject={closeFormForProject} formRef={formRef} />);
    }
    else {
        form_or_calendar = (<Calendar2 openForm={openForm} dailysObj={dailysObj} LINESPACE={LINESPACE} currentTime={currentTime}
            setCalendarUpdate={setCalendarUpdate} calnedarUpdate={calnedarUpdate} setUpdate={setProjectInfoUpdate} update={ProjectInfoUpdate}/>);
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                <CreateProject sortedData={sortedData} openFormForProject={openFormForProject} openForm={openForm} update={ProjectInfoUpdate}/>
                <RecentProject currentTime={currentTime} setUpdate={setProjectInfoUpdate} update={ProjectInfoUpdate} status={status} />
                <Charts numOfSchedule={numOfSchedule} status={status} />
            </div>
            {form_or_calendar}
        </div>
    );
}

export default React.memo(App);