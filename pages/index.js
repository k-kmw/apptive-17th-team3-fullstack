import Head from 'next/head'
import axios from 'axios';
import styles from '../styles/App.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react"

import CreateProject from   '../components/create_porject/createProject';
import Navbar        from          '../components/navbar/navbar';
import Calendar      from        '../components/calendar/calendar';
import Form          from            '../components/form/form';
import Calendar2 from '../components/calendar/calendar2';
import DoughnutChart from '../components/chart/doughnut';

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false); // form open/close
    const [checkForm, setCheckForm] = useState(false); // false일 때 프로젝트 생성창, true일 때 일정 추가하기
    const [projectName, setProjectName] = useState("");
    const [projectID, setProjectID] = useState("");
    const [data, setData] = useState([]);
    const [numOfSchedule, setNumOfSchedule] = useState([]);
    const { data: session } = useSession()
    const formRef = useRef();

    const getData = async () => {
        const res = await axios.get(`http://localhost:4000/api/p/list`);
        setData(res.data);
        // console.log(res.data);
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
    }, [])

    useEffect(() => {
        console.log(data);
        if (!!data.length) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                getScheduleNum(data[i]);
            }
        }
    }, [data]);

    const getScheduleNum = async (projectInfo) => {
        console.log()
        const res = await axios.get(`http://localhost:4000/api/p/events?projectID=${projectInfo.projectID}`);
        setNumOfSchedule((cur) => [...cur, {title: projectInfo.title, num: res.data.lists.length }]);
        // console.log(numOfSchedule);
    }

    const openForm = (name, projectID, e) => { // form open시키는 함수
        if (!session) {
            alert("로그인을 해주세요");
            return;
        } // 로그인 확인
        formRef.current && formRef.current.reset(); // form열때 초기화

        e && setProjectName(name); // click한 프로젝트 이름 받아와서 설정 
        e && setProjectID(projectID); // click한 프로젝트 이름 받아와서 설정 
        if (e && e.target.innerHTML === '+ 일정 추가하기') { // 일정추가인지, 프로젝트 추가인지 확인
            setCheckForm(true);
        }
        else {
            setCheckForm(false)
        }
        setIsFormOpen(true);
        // console.log(formRef.current);  
    }

    const closeForm = (e) => { // form 닫기
        setIsFormOpen(false);
    }

    // isFormOpen이 true이면 Form open 
    const form_or_calendar = isFormOpen ?
        // state에 저장한 것을 props로 내려줌
        // project name을 클릭이벤트로 받아서 
        (<Form closeForm={closeForm} projectID={projectID} projectName={checkForm ? projectName : null} formRef={formRef}/>) :
        (<Calendar2 />);
        
    return (
        <div className={styles.container}>
            {/* {projectIDs.length !== 0 && console.log(projectIDs)} */}
            <Navbar/>
            <div className={styles.main}>
                <CreateProject data={data} openForm={openForm} />
            </div>
            {form_or_calendar}
            <DoughnutChart data={data} numOfSchedule={numOfSchedule} />
        </div>
    );
}

export default App;