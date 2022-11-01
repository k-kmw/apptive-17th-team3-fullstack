import Head from 'next/head'

import styles from '../styles/App.module.css'
import React, { useEffect, useRef, useState } from 'react';

import CreateProject from   '../components/create_porject/createProject';
import Navbar        from          '../components/navbar/navbar';
import Calendar      from        '../components/calendar/calendar';
import Form          from            '../components/form/form';

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false); // form open/close
    const [checkForm, setCheckForm] = useState(false); // false일 때 프로젝트 생성창, true일 때 일정 추가하기
    const [projectName, setProjectName] = useState("");
    const formRef = useRef();

    const openForm = (name, e) => { // form open시키는 함수
        // if (!isLogin) {
        //   alert("로그인을 해주세요");
        //   return;
        // } // 로그인 확인
        e && setProjectName(name);
        if (e && e.target.innerHTML === '+ 일정 추가하기') { // 일정추가인지, 프로젝트 추가인지 확인
            setCheckForm(true);
        }
        else {
            setCheckForm(false)
        }
        setIsFormOpen(true);
        // console.log(formRef.current); 
        formRef.current && formRef.current.reset();  
    }

    const closeForm = (e) => { // form 닫기
        setIsFormOpen(false);
    }

    // isFormOpen이 true이면 Form open 
    const form_or_calendar = isFormOpen ?
        // state에 저장한 것을 props로 내려줌
        // project name을 클릭이벤트로 받아서 
        (<Form closeForm={closeForm} projectName={checkForm ? projectName : null} formRef={formRef}/>) :
        (<Calendar />);
        
    return (
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.main}>
                <CreateProject openForm={openForm} />
            </div>

            {form_or_calendar}
        </div>
    );
}

export default App;