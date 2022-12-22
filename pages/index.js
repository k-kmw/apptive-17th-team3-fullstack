import Head from 'next/head'
import axios from 'axios';
import styles from '../styles/App.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react"

import CreateProject from   '../components/create_porject/createProject';
import Navbar        from          '../components/navbar/navbar';
import Form          from            '../components/form/form';
import Calendar2 from '../components/calendar/calendar2';
import Charts from '../components/chart/charts';
import FormForNewProject from '../components/form/formForNewProject';
import RecentProject from '../components/recent_project/recent_project';

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false); // form open/close
    const [isProjectFormOpen, setIsFormProjectOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectID, setProjectID] = useState("");
    const [data, setData] = useState([]);
    const [numOfSchedule, setNumOfSchedule] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [dailys, setDailys] = useState();
    const [dailysObj, setDailysObj] = useState();
    const { data: session } = useSession()
    const formRef = useRef();

    const getData = async () => {
        const res = await axios.get(`http://localhost:4000/api/p/list`);
        setData(res.data);
        // console.log(res.data);
    }

    const getDailys = async () => {
        const res = await axios.get(`http://localhost:4000/api/daily`);
        // console.log(res);
        setDailys(res.data);
    }

    // useEffect(() => {
    //     async function getDataAndGetScheduleNum() {
    //         await getData();
    //         console.log(data);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]);
    //             getScheduleNum(data[i].projectID);
    //         }
    //     }
    //     getDataAndGetScheduleNum();
    // }, [])

    useEffect(() => {
        getData();
        getDailys(); // calendar 일정 받아오기
    }, [])


    useEffect(() => {
        // console.log(data);
        if (!!data.length) {
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]);
                getScheduleNum(data[i]);
            }
        }
    }, [data]);

    useEffect(() => {
        const sorted = numOfSchedule.sort((a, b) => b.num - a.num);
        setSortedData(sorted);
    }, [numOfSchedule]);

    const LINESPACE = 32.3; // calendar 줄간격
    useEffect(() => { // calender 일정 객체 생성
        const dailysObj = dailys && dailys.map(daily => ({
        "allday":  daily.allday,
        "id": daily.created,
        "startDate": !(daily.allDay==true) && daily.start,
        "endDate": !(daily.allDay==true) && daily.end,
        "startHour": !(daily.allDay==true) && parseInt(daily.start.dateTime.slice(11, 13)),
        "endHour": !(daily.allDay==true) && parseInt(daily.end.dateTime.slice(11, 13)),
        "startMinute":!(daily.allDay==true) && daily.start.dateTime.slice(14, 16),
        "endMinute":!(daily.allDay==true) && daily.end.dateTime.slice(14, 16),
        "height": !(daily.allDay==true) && (parseInt(daily.end.dateTime.slice(11, 13)) - parseInt(daily.start.dateTime.slice(11, 13))) * LINESPACE + (parseInt(daily.end.dateTime.slice(14, 16)) - parseInt(daily.start.dateTime.slice(14, 16))) / 60 * LINESPACE,
        "title": daily.summary,
        "color": daily.color,
        "allDay": daily.allDay,
        "count": 1,
        "posNum": 0,
        }))
        setDailysObj(dailysObj)
        // dailysObj && calDupDaily(dailysObj)
    }, [dailys])


    const getScheduleNum = async (projectInfo) => { // doughnut 차트 프로젝트별 일정 개수
        const encoded_url = encodeURIComponent(projectInfo.projectID);
        const res = await axios.get(`http://localhost:4000/api/p/events?projectID=${encoded_url}`);
        setNumOfSchedule((cur) => [...cur, {title: projectInfo.title, num: res.data.length, projectID: projectInfo.projectID}]);
    }
    

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
    }

    let form_or_calendar;
        if (isFormOpen) {
            form_or_calendar = (<Form closeForm={closeForm} projectID={projectID} projectName={projectName} formRef={formRef} />);
            // state에 저장한 것을 props로 내려줌
            // project name을 클릭이벤트로 받아서
        }
        else if (isProjectFormOpen) {
            form_or_calendar = (<FormForNewProject closeFormForProject={ closeFormForProject } formRef={formRef} />);
        }
        else {
            form_or_calendar = (<Calendar2 openForm={openForm} dailysObj={dailysObj} LINESPACE={LINESPACE} />);
        }

    return (
        <div className={styles.container}>
            {/* {projectIDs.length !== 0 && console.log(projectIDs)} */}
            <Navbar/>
            <div className={styles.main}>
                <CreateProject sortedData={sortedData} openFormForProject={openFormForProject} openForm={openForm} />
                <RecentProject/>
                <Charts data={data} numOfSchedule={numOfSchedule} />
            </div>
            {form_or_calendar}
        </div>
    );
}

export default App;